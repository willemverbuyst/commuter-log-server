<script>
  import { afterUpdate } from 'svelte';
  import 'chartjs-plugin-datalabels';
  import { workingDays } from '../../dummyData';
  import { getPartitionData } from '../../helpers/chartLogic/chartLogic';

  const { partition, labels, title } = getPartitionData(workingDays);

  let partitionChart;
  let ctx;

  function createChart() {
    ctx = document.getElementById('partitionChart').getContext('2d');

    const gradientFillCar = ctx.createLinearGradient(150, 0, 0, 150);
    gradientFillCar.addColorStop(0, 'rgba(0, 107, 151, 1)');
    gradientFillCar.addColorStop(0.5, 'rgba(0, 133, 166, 1)');
    gradientFillCar.addColorStop(1, 'rgba(0, 160, 175, 1)');

    const gradientFillPublic = ctx.createLinearGradient(150, 0, 0, 150);
    gradientFillPublic.addColorStop(0, 'rgba(0, 187, 178, 1)');
    gradientFillPublic.addColorStop(0.5, 'rgba(0, 213, 176, 1)');
    gradientFillPublic.addColorStop(1, 'rgba(101, 238, 172, 1)');

    const gradientFillHome = ctx.createLinearGradient(150, 0, 0, 150);
    gradientFillHome.addColorStop(0, 'rgba(255, 39, 204, 1)');
    gradientFillHome.addColorStop(0.5, 'rgba(255, 99, 132, 1)');
    gradientFillHome.addColorStop(1, 'rgba(255, 159, 64, 1)');

    if (partitionChart) partitionChart.destroy();

    partitionChart = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels,
        datasets: [
          {
            data: partition,
            backgroundColor: [
              gradientFillHome,
              gradientFillCar,
              gradientFillPublic,
            ],
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
        scale: {
          display: false,
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
          },
        },
      },
    });
  }

  afterUpdate(createChart);
</script>

<div class="chart-container">
  <canvas id="partitionChart" width="500" />
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
