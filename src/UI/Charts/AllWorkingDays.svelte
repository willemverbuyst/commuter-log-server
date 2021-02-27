<script>
  import { onMount } from 'svelte';
  import 'chartjs-plugin-datalabels';
  import { workingDays } from '../../dummyData';
  import {
    formatDataLabels,
    getAllWorkingDaysData,
  } from '../../helpers/chartLogic/chartLogic';

  const {
    travelTimes,
    maxForDisplay,
    labels,
    title,
    lineValue,
  } = getAllWorkingDaysData(workingDays);

  function createChart() {
    const ctx = document.getElementById('myChart').getContext('2d');

    const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, 'rgba(255, 159, 64, 0.8)');
    gradientStroke.addColorStop(0.5, 'rgba(255, 99, 132, 0.8)');
    gradientStroke.addColorStop(1, 'rgba(255, 39, 204, 0.8)');

    var gradientFill = ctx.createLinearGradient(500, 0, 100, 0);
    gradientFill.addColorStop(0, 'rgba(255, 159, 64, 0.8)');
    gradientFill.addColorStop(0.5, 'rgba(255, 99, 132, 0.8)');
    gradientFill.addColorStop(1, 'rgba(255, 39, 204, 0.8)');

    const myChart = new Chart(ctx, {
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
            borderColor: 'purple',
            borderWidth: 2,
            order: 1,
          },
          {
            data: travelTimes,
            borderColor: gradientStroke,
            fill: true,
            lineTension: 0.3,
            backgroundColor: gradientFill,
            borderWidth: 2,
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
                display: false,
              },
              ticks: {
                display: false,
                beginAtZero: true,
                suggestedMax: maxForDisplay,
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
            display: false,
            color: '#170a3a',
            formatter: (value) => formatDataLabels(value),
          },
        },
      },
    });
  }

  onMount(createChart);
</script>

<div class="chart-container">
  <canvas id="myChart" />
</div>

<style>
  .chart-container {
    max-width: 600px;
    margin: 4rem auto;
  }
</style>
