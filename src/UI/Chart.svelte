<script>
  import Bar from 'svelte-chartjs/src/Bar.svelte';
  import 'chartjs-plugin-datalabels';
  import { week1 } from '../dummyData';
  import {
    getBackgroundColor,
    formatDataLabels,
    getMinutes,
    getWeekdays,
    getWeekNumber,
  } from '../helpers/chartData';

  const travelTimes = getMinutes(week1);
  const backgroundColor = getBackgroundColor(week1);
  const labels = getWeekdays(week1);
  const maxForDisplay = Math.max(...travelTimes) * 1.2;
  const title = `WEEK ${getWeekNumber(week1[0].date)}`;

  let data = {
    labels,
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
            suggestedMax: maxForDisplay,
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
        display: true,
        color: '#170a3a',
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
    max-width: 600px;
    margin: 4rem auto;
  }
</style>
