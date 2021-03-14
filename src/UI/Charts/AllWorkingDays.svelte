<script>
  import { afterUpdate } from 'svelte';
  import 'chartjs-plugin-datalabels';
  import {
    formatDataLabels,
    getAllWorkingDaysData,
  } from '../../Helpers/chartLogic/chartLogic';

  export let showGrid;
  export let logData;

  const {
    travelTimes,
    maxForDisplay,
    labels,
    title,
    lineValue,
  } = getAllWorkingDaysData(logData);

  let allWorkingDaysChart;
  let ctx;

  function createChart() {
    ctx = document.getElementById('allWorkingDaysChart').getContext('2d');

    const gradientFill = ctx.createLinearGradient(0, 100, 0, 250);
    gradientFill.addColorStop(0, 'rgba(255, 39, 204, 1)');
    gradientFill.addColorStop(0.5, 'rgba(255, 99, 132, 1)');
    gradientFill.addColorStop(1, 'rgba(255, 159, 64, 1)');

    if (allWorkingDaysChart) allWorkingDaysChart.destroy();

    allWorkingDaysChart = new Chart(ctx, {
      type: 'line',

      data: {
        labels,
        datasets: [
          {
            label: 'Line Dataset',
            data: lineValue,
            borderJoinStyle: 'miter',
            type: 'line',
            fill: false,
            borderColor: 'rgba(21, 211, 211, 1)',
            borderWidth: 2,
            order: 1,
          },
          {
            data: travelTimes,
            fill: true,
            lineTension: 0.3,
            backgroundColor: gradientFill,
            borderWidth: 0,
            order: 2,
          },
        ],
      },
      options: {
        animation: {
          easing: 'easeInOutBack',
        },
        title: {
          display: true,
          text: title,
          fontColor: '#aaa',
        },
        maintainAspectRatio: true,
        aspectRatio: 4,
        legend: {
          display: false,
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        responsive: true,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
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
            display: false,
          },
        },
      },
    });
  }

  afterUpdate(createChart);
</script>

<div class="dashboard__container">
  <canvas id="allWorkingDaysChart" width="1150" />
</div>
