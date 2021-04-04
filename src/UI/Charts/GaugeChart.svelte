<script lang="ts">
  import { afterUpdate } from 'svelte';
  import 'chartjs-plugin-datalabels';
  import { formatDataLabels } from '../../Helpers/chartLogic/chartLogic';
  import { actualTravelTime } from '../../Helpers/chartLogic/gaugeChart';
  import type { LogDate } from '../../models/Logdata';
  import Chart from 'chart.js';
  import { colorTitle } from '../colors';

  export let logData: LogDate[];
  export let weekIndexInLogData: number;

  let gaugeChart: Chart;
  let ctx: CanvasRenderingContext2D;

  const labels = ['', ''];

  function createChart() {
    const { backgroundColor, backGroundColorInner, data } = actualTravelTime(
      logData,
      weekIndexInLogData
    );

    const canvas = <HTMLCanvasElement>document.getElementById('gaugeChart');
    ctx = canvas.getContext('2d')!;

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
          text: '',
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
            color: colorTitle,
            formatter: (value: number) => formatDataLabels(value),
          },
        },
      },
    });
  }

  afterUpdate(createChart);
</script>

<div class="dashboard__container">
  <canvas id="gaugeChart" width="500" />
</div>
