<script>
  import { afterUpdate } from 'svelte';
  import 'chartjs-plugin-datalabels';
  import { workingDays } from '../../dummyData';
  import { formatDataLabels } from '../../Helpers/chartLogic/chartLogic';
  import { getCarVsPublicTotalsData } from '../../Helpers/chartLogic/totalsChart';

  const {
    totalsCar,
    totalsPublic,
    labels,
    maxForDisplay,
    title,
  } = getCarVsPublicTotalsData(workingDays);

  let carVsPublicChart;
  let ctx;

  function createChart() {
    ctx = document.getElementById('carVsPublicChart').getContext('2d');

    const gradientFillCar = ctx.createLinearGradient(0, 0, 0, 250);
    gradientFillCar.addColorStop(0, '#006b97');
    gradientFillCar.addColorStop(0.5, '#0085a6');
    gradientFillCar.addColorStop(1, '#00a0af');

    const gradientFillPublic = ctx.createLinearGradient(0, 0, 0, 250);
    gradientFillPublic.addColorStop(0, '#00bbb2');
    gradientFillPublic.addColorStop(0.5, '#00d5b0');
    gradientFillPublic.addColorStop(1, '#65eeac');

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
