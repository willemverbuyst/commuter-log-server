<script>
  import { afterUpdate } from 'svelte';
  import 'chartjs-plugin-datalabels';
  import {
    formatDataLabels,
    getWeekData,
  } from '../../Helpers/chartLogic/chartLogic';

  export let showGrid;
  export let logData;
  export let weekIndexInLogData;

  let weekChart;
  let ctx;

  function createChart() {
    const {
      travelTimes,
      backgroundColor,
      labels,
      maxForDisplay,
      title,
    } = getWeekData(logData, weekIndexInLogData);

    ctx = document.getElementById('weekChart').getContext('2d');

    if (weekChart) weekChart.destroy();

    weekChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            data: travelTimes,
            backgroundColor,
            borderWidth: 0,
            barPercentage: 1,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: title,
          fontColor: '#aaa',
        },
        maintainAspectRatio: true,
        legend: {
          display: false,
        },
        responsive: true,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
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
                stepSize: 60,
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
            align: 'top',
            display: true,
            color: 'rgba(170, 170, 170, 0.3)',
            formatter: !showGrid
              ? (value) => {
                  return value === 0
                    ? ''
                    : value === 0.00001
                    ? 'WFH'
                    : formatDataLabels(value);
                }
              : (value) => {
                  return value === 0 ? '' : value === 0.00001 ? 'WFH' : '';
                },
          },
        },
      },
    });
  }

  afterUpdate(createChart);
</script>

<div class="dashboard__container">
  <canvas id="weekChart" width="500" />
</div>
