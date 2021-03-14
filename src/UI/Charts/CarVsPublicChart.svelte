<script>
  import { afterUpdate } from 'svelte';
  import 'chartjs-plugin-datalabels';
  import { formatDataLabels } from '../../Helpers/chartLogic/chartLogic';
  import { getCarVsPublicTotalsData } from '../../Helpers/chartLogic/totalsChart';

  export let logData;

  const {
    totalsCar,
    totalsPublic,
    labels,
    maxForDisplay,
    title,
  } = getCarVsPublicTotalsData(logData);

  let carVsPublicChart;
  let ctx;

  function createChart() {
    ctx = document.getElementById('carVsPublicChart').getContext('2d');

    const gradientFillCar = ctx.createLinearGradient(0, 0, 0, 250);
    gradientFillCar.addColorStop(0, 'rgba(0, 107, 151, 1)');
    gradientFillCar.addColorStop(0.5, 'rgba(0, 133, 166, 1)');
    gradientFillCar.addColorStop(1, 'rgba(0, 160, 175, 1)');

    const gradientFillPublic = ctx.createLinearGradient(0, 0, 0, 250);
    gradientFillPublic.addColorStop(0, 'rgba(0, 187, 178, 1)');
    gradientFillPublic.addColorStop(0.5, 'rgba(0, 213, 176, 1)');
    gradientFillPublic.addColorStop(1, 'rgba(101, 238, 172, 1)');

    if (carVsPublicChart) carVsPublicChart.destroy();

    carVsPublicChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            data: [
              totalsCar.totalTimeTravelled,
              totalsPublic.totalTimeTravelled,
            ],
            backgroundColor: [gradientFillCar, gradientFillPublic],
            borderWidth: 0,
            barPercentage: 1,
          },
        ],
      },
      options: {
        cutoutPercentage: 0,
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
            display: true,
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
  <canvas id="carVsPublicChart" width="500" />
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
