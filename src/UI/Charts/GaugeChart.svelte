<script>
  import { afterUpdate } from 'svelte';
  import 'chartjs-plugin-datalabels';
  import { formatDataLabels } from '../../Helpers/chartLogic/chartLogic';
  import { actualTravelTime } from '../../Helpers/chartLogic/speedometerChart';

  let gaugeChart;
  export let logData;
  export let weekIndexInLogData;
  let ctx;
  const labels = ['', ''];

  function createChart() {
    const { backgroundColor, backGroundColorInner, data } = actualTravelTime(
      logData,
      weekIndexInLogData
    );

    ctx = document.getElementById('gaugeChart').getContext('2d');

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
            data,
            backgroundColor,
            borderWidth: 0,
          },
          {
            data,
            backgroundColor: backGroundColorInner,
            borderWidth: 0,
          },
          {
            data,
            backgroundColor: backGroundColorInner,
            borderWidth: 0,
          },
          {
            data,
            backgroundColor: backGroundColorInner,
            borderWidth: 0,
          },
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
