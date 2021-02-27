<script>
  import { onMount } from 'svelte';
  import 'chartjs-plugin-datalabels';
  import { workingDays } from '../../dummyData';
  import {
    formatDataLabels,
    getWeekData,
  } from '../../helpers/chartLogic/chartLogic';

  const {
    travelTimes,
    backgroundColor,
    labels,
    maxForDisplay,
    title,
  } = getWeekData(workingDays, 4);

  function createChart() {
    const ctx = document.getElementById('weekChart').getContext('2d');

    const weekChart = new Chart(ctx, {
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
            anchor: 'end',
            align: 'top',
            display: true,
            color: '#170a3a',
            formatter: (value) => {
              return value === 0
                ? ''
                : value === 0.00001
                ? 'WFH'
                : // : formatDataLabels(value);
                  '';
            },
          },
        },
      },
    });
  }

  onMount(createChart);
</script>

<div class="chart-container">
  <canvas id="weekChart" />
</div>

<style>
  .chart-container {
    max-width: 600px;
    margin: 4rem auto;
  }
</style>
