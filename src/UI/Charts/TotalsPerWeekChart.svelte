<script>
  import { afterUpdate } from 'svelte';
  import 'chartjs-plugin-datalabels';
  import { formatDataLabels } from '../../Helpers/chartLogic/chartLogic';
  import { getTotalsPerWeekData } from '../../Helpers/chartLogic/totalsPerWeekChart';

  export let showGrid;
  export let logData;

  let totalsPerWeekChart;
  let ctx;

  const totalizer = {
    id: 'totalizer',

    beforeUpdate: (chart) => {
      let totals = {};
      let utmost = 0;

      chart.data.datasets.forEach((dataset, datasetIndex) => {
        if (chart.isDatasetVisible(datasetIndex)) {
          utmost = datasetIndex;
          dataset.data.forEach((value, index) => {
            totals[index] = (totals[index] || 0) + value;
          });
        }
      });

      chart.$totalizer = {
        totals: totals,
        utmost: utmost,
      };
    },
  };

  function createChart() {
    const {
      totalsPerWeekCar,
      totalsPerWeekPublic,
      labels,
      maxForDisplay,
      title,
    } = getTotalsPerWeekData(logData);

    ctx = document.getElementById('totalsPerWeekChart').getContext('2d');

    const gradientFillCar = ctx.createLinearGradient(0, 0, 0, 250);
    gradientFillCar.addColorStop(0, 'rgba(0, 107, 151, 1)');
    gradientFillCar.addColorStop(0.5, 'rgba(0, 133, 166, 1)');
    gradientFillCar.addColorStop(1, 'rgba(0, 160, 175, 1)');

    const gradientFillPublic = ctx.createLinearGradient(0, 0, 0, 250);
    gradientFillPublic.addColorStop(0, 'rgba(0, 187, 178, 1)');
    gradientFillPublic.addColorStop(0.5, 'rgba(0, 213, 176, 1)');
    gradientFillPublic.addColorStop(1, 'rgba(101, 238, 172, 1)');

    if (totalsPerWeekChart) totalsPerWeekChart.destroy();

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
          fontColor: '#aaa',
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
                color: 'rgba(170, 170, 170, 0.3)',
                zeroLineColor: 'rgba(170, 170, 170, 0.3)',
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
                  return formatDataLabels(value);
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
            color: '#aaa',
            formatter: (_value, ctx) => {
              const total = ctx.chart.$totalizer.totals[ctx.dataIndex];
              return formatDataLabels(total);
            },
            display: !showGrid
              ? function (ctx) {
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
