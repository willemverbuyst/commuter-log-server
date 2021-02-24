<script>
  import Pie from 'svelte-chartjs/src/Pie.svelte';
  import 'chartjs-plugin-datalabels';
  import { workingDays } from '../../dummyData';
  import { getTransportPartitionData } from '../../helpers/chartLogic';

  const {
    partition,
    backgroundColor,
    labels,
    title,
  } = getTransportPartitionData(workingDays);

  let data = {
    labels,
    datasets: [
      {
        data: partition,
        backgroundColor,
        borderWidth: 0,
        barPercentage: 1,
      },
    ],
  };

  let options = {
    title: {
      display: true,
      text: title,
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
  };
</script>

<div class="chart-container">
  <Pie {data} {options} />
</div>

<style>
  .chart-container {
    max-width: 600px;
    margin: 4rem auto;
  }
</style>
