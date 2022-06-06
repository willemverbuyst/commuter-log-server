<script>
  import { afterUpdate } from 'svelte';
  import 'chartjs-plugin-datalabels';
  import { formatDuration } from '../../helpers/formatting';
  import { getWeekData } from '../../helpers/chartLogic/weekChartLogic';
  import Chart from 'chart.js';
  import { colorGrid, colorTitle } from '../colors';

  export let showGrid;
  export let logData;
  export let weekIndexInLogData;

  let weekChart;
  let ctx;

  function createChart() {
    const { travelTimes, backgroundColor, labels, maxForDisplay, title } =
      getWeekData(logData, weekIndexInLogData);

    const canvas = document.getElementById('weekChart');
    ctx = canvas.getContext('2d');

    if (weekChart) weekChart.destroy();

    weekChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            data: travelTimes,
            backgroundColor,
            borderWidth: 0,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: title,
          fontColor: colorTitle,
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
                display: showGrid,
                color: colorGrid,
                zeroLineColor: colorGrid,
                tickMarkLength: 0,
                drawBorder: false,
              },
              ticks: {
                padding: 10,
                display: showGrid,
                beginAtZero: true,
                suggestedMax: maxForDisplay > 180 ? maxForDisplay : 180,
                stepSize: 60,
                callback: function (value, _index, _values) {
                  return formatDuration(Number(value));
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
            display: true,
            color: colorTitle,
            formatter: !showGrid
              ? (value) => {
                  return value === 0
                    ? ''
                    : value === 0.00001
                    ? 'WFH'
                    : formatDuration(value);
                }
              : (value) => {
                  return value === 0 ? '' : value === 0.00001 ? 'WFH' : '';
                },
          },
        },
      },
    });
  }

  afterUpdate(createChart);
</script>

<div class="dashboard__container">
  <canvas id="weekChart" width="500" />
</div>
