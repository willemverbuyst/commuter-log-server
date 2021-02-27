<script>
  import Polar from 'svelte-chartjs/src/Polar.svelte';
  import 'chartjs-plugin-datalabels';
  import { workingDays } from '../../dummyData';
  import { getPartitionData } from '../../helpers/chartLogic/chartLogic';

  const { partition, backgroundColor, labels, title } = getPartitionData(
    workingDays
  );

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
  };
</script>

<div class="chart-container">
  <Polar {data} {options} />
</div>

<style>
  /* .chart-container {
    max-width: 600px;
    margin: 4rem auto;
    padding: 2rem;
    border: 2px solid #aaa;
    border-radius: 7px;
  } */
</style>
