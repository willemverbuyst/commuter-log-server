<script lang="ts">
  import { afterUpdate } from 'svelte';
  import 'chartjs-plugin-datalabels';
  import { formatDuration } from '../../Helpers/formatting';
  import { getCarVsPublicTotalsData } from '../../Helpers/chartLogic/carVsPublicChart';
  import {
    colorDatalabels,
    colorTitle,
    colorTravelByCar,
    colorTravelByPublicTransport,
  } from '../colors';
  import type { LogDate } from '../../models/Logdata';
  import Chart from 'chart.js';

  export let logData: LogDate[];

  let carVsPublicChart: Chart;
  let ctx: CanvasRenderingContext2D;

  function createChart() {
    const { totalsCar, totalsPublic, labels, title } = getCarVsPublicTotalsData(
      logData
    );

    const canvas = <HTMLCanvasElement>(
      document.getElementById('carVsPublicChart')
    );
    ctx = canvas.getContext('2d')!;

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
            backgroundColor: [colorTravelByCar, colorTravelByPublicTransport],
            borderWidth: 0,
          },
        ],
      },
      options: {
        cutoutPercentage: 0,
        title: {
          display: true,
          text: title,
          fontColor: colorTitle,
        },
        maintainAspectRatio: true,
        legend: {
          position: 'bottom',
        },
        responsive: true,
        tooltips: {
          enabled: false,
        },
        plugins: {
          datalabels: {
            display: true,
            color: colorDatalabels,
            formatter: (value: number) => formatDuration(value),
          },
        },
      },
    });
  }

  afterUpdate(createChart);
</script>

<div class="dashboard__container">
  <canvas id="carVsPublicChart" width="500" />
</div>
