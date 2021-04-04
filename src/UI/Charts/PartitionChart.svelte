<script lang="ts">
  import { afterUpdate } from 'svelte';
  import 'chartjs-plugin-datalabels';
  import { getPartitionData } from '../../Helpers/chartLogic/partitionChart';
  import type { LogDate } from '../../models/Logdata';
  import Chart from 'chart.js';

  export let logData: LogDate[];

  let partitionChart: Chart;
  let ctx: CanvasRenderingContext2D;

  function createChart() {
    const { partition, labels, title } = getPartitionData(logData);

    const canvas = <HTMLCanvasElement>document.getElementById('partitionChart');
    ctx = canvas.getContext('2d')!;

    const fillCar = 'rgba(0, 107, 151, 1)';
    const fillPublic = 'rgba(0, 187, 178, 1)';
    const fillHome = 'rgba(255, 39, 204, 1)';

    if (partitionChart) partitionChart.destroy();

    partitionChart = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels,
        datasets: [
          {
            data: partition,
            backgroundColor: [fillHome, fillCar, fillPublic],
            borderWidth: 0,
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
