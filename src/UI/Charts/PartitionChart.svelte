<script>
  import { onMount } from 'svelte';
  import 'chartjs-plugin-datalabels';
  import { workingDays } from '../../dummyData';
  import { getPartitionData } from '../../helpers/chartLogic/chartLogic';

  const { partition, labels, title } = getPartitionData(workingDays);

  function createChart() {
    const ctx = document.getElementById('partitionChart').getContext('2d');

    const gradientFillCar = ctx.createLinearGradient(150, 0, 0, 150);
    gradientFillCar.addColorStop(0, '#006b97');
    gradientFillCar.addColorStop(0.5, '#0085a6');
    gradientFillCar.addColorStop(1, '#00a0af');

    var gradientFillPublic = ctx.createLinearGradient(150, 0, 0, 150);
    gradientFillPublic.addColorStop(0, '#00bbb2');
    gradientFillPublic.addColorStop(0.5, '#00d5b0');
    gradientFillPublic.addColorStop(1, '#65eeac');

    var gradientFillHome = ctx.createLinearGradient(150, 0, 0, 150);
    gradientFillHome.addColorStop(0, 'rgba(255, 39, 204, 0.8)');
    gradientFillHome.addColorStop(0.5, 'rgba(255, 99, 132, 0.8)');
    gradientFillHome.addColorStop(1, 'rgba(255, 159, 64, 0.8)');

    const partitionChart = new Chart(ctx, {
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

  onMount(createChart);
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
