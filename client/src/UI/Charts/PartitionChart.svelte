<script lang="ts">
  import { afterUpdate } from 'svelte';
  import 'chartjs-plugin-datalabels';
  import { getPartitionData } from '../../Helpers/chartLogic/partitionChart';
  import type { LogDate } from '../../models/Logdata';
  import Chart from 'chart.js';
  import {
    colorTitle,
    colorTravelByCar,
    colorTravelByPublicTransport,
    colorWorkingFromHomeColor,
  } from '../colors';

  export let logData: LogDate[];

  let partitionChart: Chart;
  let ctx: CanvasRenderingContext2D;

  function createChart() {
    const { partition, labels, title } = getPartitionData(logData);

    const canvas = <HTMLCanvasElement>document.getElementById('partitionChart');
    ctx = canvas.getContext('2d')!;

    if (partitionChart) partitionChart.destroy();

    partitionChart = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels,
        datasets: [
          {
            data: partition,
            backgroundColor: [
              colorWorkingFromHomeColor,
              colorTravelByCar,
              colorTravelByPublicTransport,
            ],
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
          position: 'bottom',
        },
        responsive: true,
        scale: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        plugins: {
          datalabels: {
            display: true,
            color: '#fff',
          },
        },
      },
    });
  }

  afterUpdate(createChart);
</script>

<div class="dashboard__container">
  <canvas id="partitionChart" width="500" />
</div>
