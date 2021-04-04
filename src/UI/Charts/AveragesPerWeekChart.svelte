<script lang="ts">
  import { afterUpdate } from 'svelte';
  import 'chartjs-plugin-datalabels';
  import { formatDataLabels } from '../../Helpers/chartLogic/chartLogic';
  import { getAveragePerWeekData } from '../../Helpers/chartLogic/averagesChart';
  import type { LogDate } from '../../models/Logdata';
  import Chart from 'chart.js';
  import {
    colorGrid,
    colorTitle,
    colorTravelTimeExtra,
    colorTravelTimeMaps,
    colorTravelTimeNormal,
  } from '../colors';

  export let showGrid: boolean;
  export let logData: LogDate[];

  let averagesPerWeekChart: Chart;
  let ctx: CanvasRenderingContext2D;

  function createChart() {
    const { averages, labels, maxForDisplay, title } = getAveragePerWeekData(
      logData
    );

    const canvas = <HTMLCanvasElement>(
      document.getElementById('averagesPerWeekChart')
    );
    ctx = canvas.getContext('2d')!;

    const gradientStroke = ctx.createLinearGradient(0, 100, 0, 250);
    gradientStroke.addColorStop(0, colorTravelTimeExtra);
    gradientStroke.addColorStop(0.5, colorTravelTimeMaps);
    gradientStroke.addColorStop(1, colorTravelTimeNormal);

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
          fontColor: colorTitle,
        },
        maintainAspectRatio: true,
        aspectRatio: 4,
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
                color: colorGrid,
                zeroLineColor: colorGrid,
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
                  return formatDataLabels(Number(value));
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
            color: colorGrid,
            formatter: (value: number) => formatDataLabels(value),
          },
        },
      },
    });
  }
  afterUpdate(createChart);
</script>

<div class="dashboard__container">
  <canvas id="averagesPerWeekChart" width="1150" />
</div>
