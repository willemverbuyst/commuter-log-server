<script>
  import { onMount } from 'svelte';
  import 'chartjs-plugin-datalabels';
  import { workingDays } from '../../dummyData';
  import { formatDataLabels } from '../../helpers/chartLogic/chartLogic';
  import { getAveragePerWeekData } from '../../helpers/chartLogic/averagesChart';

  const { averages, labels, maxForDisplay, title } = getAveragePerWeekData(
    workingDays
  );

  function createChart() {
    const ctx = document
      .getElementById('averagesPerWeekChart')
      .getContext('2d');

    const gradientStroke = ctx.createLinearGradient(0, 100, 0, 300);
    gradientStroke.addColorStop(0, '#ff0080 ');
    gradientStroke.addColorStop(0.5, '#ff8c00');
    gradientStroke.addColorStop(1, '#40e0d0');

    const myAllWorkingDaysChart = new Chart(ctx, {
      type: 'line',

      data: {
        labels,
        datasets: [
          {
            data: averages,
            fill: false,
            borderColor: gradientStroke,
            borderWidth: 3,
            barPercentage: 1,
            steppedLine: 'middle',
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
                beginAtZero: true,
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
            formatter: (value) => formatDataLabels(value),
          },
        },
      },
    });
  }
  onMount(createChart);
</script>

<div class="chart-container">
  <canvas id="averagesPerWeekChart" />
</div>

<style>
  .chart-container {
    max-width: 600px;
    margin: 4rem auto;
  }
</style>
