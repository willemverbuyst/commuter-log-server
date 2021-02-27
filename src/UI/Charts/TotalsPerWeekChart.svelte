<script>
  import { onMount } from 'svelte';
  import 'chartjs-plugin-datalabels';
  import { workingDays } from '../../dummyData';
  import { formatDataLabels } from '../../helpers/chartLogic/chartLogic';
  import { getTotalsPerWeekData } from '../../helpers/chartLogic/totalsChart';

  const {
    totalsPerWeekCar,
    totalsPerWeekPublic,
    labels,
    maxForDisplay,
    title,
  } = getTotalsPerWeekData(workingDays);

  function createChart() {
    const ctx = document.getElementById('totalsPerWeekChart').getContext('2d');

    const gradientFillCar = ctx.createLinearGradient(0, 0, 0, 200);
    gradientFillCar.addColorStop(0, '#006b97');
    gradientFillCar.addColorStop(0.5, '#0085a6');
    gradientFillCar.addColorStop(1, '#00a0af');

    var gradientFillPublic = ctx.createLinearGradient(0, 0, 0, 200);
    gradientFillPublic.addColorStop(0, '#00bbb2');
    gradientFillPublic.addColorStop(0.5, '#00d5b0');
    gradientFillPublic.addColorStop(1, '#65eeac');

    const totalsPerWeekChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            data: totalsPerWeekCar,
            backgroundColor: gradientFillCar,
            borderWidth: 0,
            barPercentage: 1,
          },
          {
            data: totalsPerWeekPublic,
            backgroundColor: gradientFillPublic,
            borderWidth: 0,
            barPercentage: 1,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: title,
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        maintainAspectRatio: true,
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
  <canvas id="totalsPerWeekChart" />
</div>

<style>
  .chart-container {
    max-width: 600px;
    margin: 4rem auto;
  }
</style>
