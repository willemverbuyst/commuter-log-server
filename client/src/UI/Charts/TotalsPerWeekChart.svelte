<script>
  import { afterUpdate } from 'svelte';
  import 'chartjs-plugin-datalabels';
  import { formatDuration } from '../../helpers/formatting';
  import { getTotalsPerWeekData } from '../../helpers/chartLogic/totalsPerWeekChart';
  import Chart from 'chart.js';
  import {
    colorGrid,
    colorTitle,
    colorTravelByCar,
    colorTravelByCarSecond,
    colorTravelByCarThird,
    colorTravelByPublicTransport,
    colorTravelByPublicTransportSecond,
    colorTravelByPublicTransportThird,
  } from '../colors';

  export let showGrid;
  export let logData;

  let totalsPerWeekChart;
  let ctx;

  function createChart() {
    const {
      totalsPerWeekCar,
      totalsPerWeekPublic,
      labels,
      maxForDisplay,
      title,
    } = getTotalsPerWeekData(logData);

    const canvas = document.getElementById('totalsPerWeekChart');
    ctx = canvas.getContext('2d');

    const gradientFillCar = ctx.createLinearGradient(0, 0, 0, 250);
    gradientFillCar.addColorStop(0, colorTravelByCar);
    gradientFillCar.addColorStop(0.5, colorTravelByCarSecond);
    gradientFillCar.addColorStop(1, colorTravelByCarThird);

    const gradientFillPublic = ctx.createLinearGradient(0, 0, 0, 250);
    gradientFillPublic.addColorStop(0, colorTravelByPublicTransport);
    gradientFillPublic.addColorStop(0.5, colorTravelByPublicTransportSecond);
    gradientFillPublic.addColorStop(1, colorTravelByPublicTransportThird);

    if (totalsPerWeekChart) totalsPerWeekChart.destroy();

    const totalizer = {
      id: 'totalizer',

      beforeUpdate: (chart) => {
        let totals = {};
        let utmost = 0;

        if (chart && chart.data && chart.data.datasets) {
          chart.data.datasets.forEach((dataset, datasetIndex) => {
            if (chart.isDatasetVisible(datasetIndex)) {
              utmost = datasetIndex;
              dataset.data.forEach((value, index) => {
                totals[index] = (totals[index] || 0) + value;
              });
            }
          });
        }

        chart.$totalizer = {
          totals: totals,
          utmost: utmost,
        };
      },
    };

    totalsPerWeekChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            data: totalsPerWeekCar,
            backgroundColor: gradientFillCar,
            borderWidth: 0,
          },
          {
            data: totalsPerWeekPublic,
            backgroundColor: gradientFillPublic,
            borderWidth: 0,
          },
        ],
      },
      plugins: [totalizer],
      options: {
        title: {
          display: true,
          text: title,
          fontColor: colorTitle,
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        maintainAspectRatio: true,
        aspectRatio: 4,
        legend: {
          display: false,
        },
        responsive: true,
        scales: {
          xAxes: [
            {
              stacked: true,
              gridLines: {
                display: false,
              },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          yAxes: [
            {
              stacked: true,
              gridLines: {
                display: showGrid,
                color: colorGrid,
                zeroLineColor: colorGrid,
                tickMarkLength: 0,
                drawBorder: false,
              },
              ticks: {
                padding: 10,
                display: showGrid,
                beginAtZero: true,
                suggestedMax: maxForDisplay,
                stepSize: 120,
                callback: function (value, _index, _values) {
                  return formatDuration(Number(value));
                },
              },
            },
          ],
        },
        tooltips: {
          enabled: false,
        },
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end',
            color: colorTitle,
            formatter: (_value, ctx) => {
              // @ts-ignore
              const total = ctx.chart.$totalizer.totals[ctx.dataIndex];
              return formatDuration(total);
            },
            display: !showGrid
              ? function (ctx) {
                  // @ts-ignore
                  return ctx.datasetIndex === ctx.chart.$totalizer.utmost;
                }
              : false,
          },
        },
      },
    });
  }

  afterUpdate(createChart);
</script>

<div class="dashboard__container">
  <canvas id="totalsPerWeekChart" width="1150" />
</div>
