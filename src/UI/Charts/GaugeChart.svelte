<script>
  import { afterUpdate } from 'svelte';
  import 'chartjs-plugin-datalabels';
  import { formatDataLabels } from '../../Helpers/chartLogic/chartLogic';

  let gaugeChart;
  let ctx;
  const labels = ['', ''];

  function createChart() {
    ctx = document.getElementById('gaugeChart').getContext('2d');

    const gradientFillCar = ctx.createLinearGradient(0, 0, 0, 250);
    gradientFillCar.addColorStop(0, 'rgba(0, 107, 151, 1)');
    gradientFillCar.addColorStop(0.5, 'rgba(0, 133, 166, 1)');
    gradientFillCar.addColorStop(1, 'rgba(0, 160, 175, 1)');

    const gradientFillPublic = ctx.createLinearGradient(0, 0, 0, 250);
    gradientFillPublic.addColorStop(0, 'rgba(0, 187, 178, 1)');
    gradientFillPublic.addColorStop(0.5, 'rgba(0, 213, 176, 1)');
    gradientFillPublic.addColorStop(1, 'rgba(101, 238, 172, 1)');

    const gradientFill = ctx.createLinearGradient(0, 100, 0, 250);
    gradientFill.addColorStop(0, 'rgba(255, 39, 204, 1)');
    gradientFill.addColorStop(0.5, 'rgba(255, 99, 132, 1)');
    gradientFill.addColorStop(1, 'rgba(255, 159, 64, 1)');

    if (gaugeChart) gaugeChart.destroy();

    gaugeChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            data: [400, 20, 340, 150],
            backgroundColor: [
              'rgba(255, 159, 64, 1)',
              '#aaa',
              'rgba(255, 159, 64, 1)',
              'darkred',
            ],
            borderWidth: 0,
          },
          {
            data: [400, 20, 490],
            backgroundColor: ['transparent', '#aaa', 'transparent'],
            borderWidth: 0,
          },
          {
            data: [400, 20, 490],
            backgroundColor: ['transparent', '#aaa', 'transparent'],
            borderWidth: 0,
          },
          {
            data: [400, 20, 490],
            backgroundColor: ['transparent', '#aaa', 'transparent'],
            borderWidth: 0,
          },

          // {
          //   data: [100],
          //   backgroundColor: ['transparent'],
          //   borderWidth: 0,
          // },

          // {
          //   data: [600, 300],
          //   backgroundColor: ['transparent', 'transparent'],
          //   borderWidth: 2,
          //   borderColor: 'red',
          //   borderSkipped: 'bottom',
          // },
        ],
      },
      options: {
        circumference: Math.PI,
        rotation: Math.PI,
        cutoutPercentage: 0,
        title: {
          display: true,
          text: 'Gauge',
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
                display: false,
              },
              ticks: {
                display: false,
                beginAtZero: true,
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
            color: '#333',
            formatter: (value) => formatDataLabels(value),
          },
        },
      },
    });
  }

  afterUpdate(createChart);
</script>

<div class="chart-container">
  <canvas id="gaugeChart" width="500" />
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
