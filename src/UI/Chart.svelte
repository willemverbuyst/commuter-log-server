<script>
  import Bar from 'svelte-chartjs/src/Bar.svelte';
  import 'chartjs-plugin-datalabels';
  import { formatDataLabels } from '../helpers/format';
  import { week1 } from '../dummyData';
  import { getBackgroundColor, getMinutes } from '../helpers/chartData';

  const travelTimes = getMinutes(week1);
  const backgroundColor = getBackgroundColor(week1);
  const max = Math.max(...travelTimes) * 1.2;

  let data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        data: travelTimes,
        backgroundColor,
        borderWidth: 0,
        barPercentage: 1,
      },
    ],
  };

  let options = {
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
            suggestedMax: max,
          },
        },
      ],
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'top',
        display: true,
        color: 'white',
        formatter: (value) => formatDataLabels(value),
      },
    },
  };
</script>

<div class="chart-container">
  <Bar {data} {options} />
</div>

<style>
  .chart-container {
    width: 600px;
    margin: 4rem auto;
  }
</style>
