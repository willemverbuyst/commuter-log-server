<script>
  import { afterUpdate } from 'svelte';
  import 'chartjs-plugin-datalabels';
  import { workingDays } from '../../dummyData';
  import { formatDataLabels } from '../../Helpers/chartLogic/chartLogic';
  import { getAveragePerWeekData } from '../../Helpers/chartLogic/averagesChart';

  export let showGrid;

  const { averages, labels, maxForDisplay, title } = getAveragePerWeekData(
    workingDays
  );

  let averagesPerWeekChart;
  let ctx;

  function createChart() {
    ctx = document.getElementById('averagesPerWeekChart').getContext('2d');

    const gradientStroke = ctx.createLinearGradient(0, 100, 0, 250);
    gradientStroke.addColorStop(0, 'rgba(255, 0, 128, 1)');
    gradientStroke.addColorStop(0.5, 'rgba(255, 140, 0, 1)');
    gradientStroke.addColorStop(1, 'rgba(64, 224, 208, 1)');

    if (averagesPerWeekChart) averagesPerWeekChart.destroy();

    averagesPerWeekChart = new Chart(ctx, {
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
                beginAtZero: true,
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
            anchor: 'end',
            align: 'top',
            display: !showGrid,
            color: 'rgba(170, 170, 170, 0.3)',
            formatter: (value) => formatDataLabels(value),
          },
        },
      },
    });
  }
  afterUpdate(createChart);
</script>

<div class="chart-container">
  <canvas id="averagesPerWeekChart" width="500" />
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
