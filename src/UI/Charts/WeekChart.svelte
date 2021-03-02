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
            anchor: 'end',
            align: 'top',
            display: true,
            color: 'rgb(170,170,170)',
            formatter: (value) => {
              return value === 0
                ? ''
                : value === 0.00001
                ? 'WFH'
                : formatDataLabels(value);
            },
          },
        },
      },
    });
  }

  onMount(createChart);
</script>

<div class="chart-container">
  <canvas id="weekChart" width="500" />
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
