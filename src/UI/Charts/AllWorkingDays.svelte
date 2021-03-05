<script>
  import { onMount } from 'svelte';
  import 'chartjs-plugin-datalabels';
  import { workingDays } from '../../dummyData';
  import {
    formatDataLabels,
    getAllWorkingDaysData,
  } from '../../Helpers/chartLogic/chartLogic';

  export let showGrid;

  const {
    travelTimes,
    maxForDisplay,
    labels,
    title,
    lineValue,
  } = getAllWorkingDaysData(workingDays);

  function createChart() {
    const ctx = document.getElementById('allWorkingDaysChart').getContext('2d');

    const gradientStroke = ctx.createLinearGradient(0, 100, 0, 250);
    gradientStroke.addColorStop(0, 'rgba(255, 39, 204, 0.8)');
    gradientStroke.addColorStop(0.5, 'rgba(255, 99, 132, 0.8)');
    gradientStroke.addColorStop(1, 'rgba(255, 159, 64, 0.8)');

    var gradientFill = ctx.createLinearGradient(0, 100, 0, 250);
    gradientFill.addColorStop(0, 'rgba(255, 39, 204, 0.8)');
    gradientFill.addColorStop(0.5, 'rgba(255, 99, 132, 0.8)');
    gradientFill.addColorStop(1, 'rgba(255, 159, 64, 0.8)');

    const allWorkingDaysChart = new Chart(ctx, {
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
            borderColor: 'rgba(21,211,211,.6)',
            borderWidth: 2,
            order: 1,
          },
          {
            data: travelTimes,
            borderColor: gradientStroke,
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

  onMount(createChart);
</script>

<div class="chart-container">
  <canvas id="allWorkingDaysChart" width="500" />
</div>

<style>
  .chart-container {
    margin-top: 4rem;
    padding: 2rem;
    border: 2px solid #333;
    border-radius: 7px;
    box-shadow: inset 4px 4px 4px #222, inset -4px -4px 4px #444;
  }
</style>
