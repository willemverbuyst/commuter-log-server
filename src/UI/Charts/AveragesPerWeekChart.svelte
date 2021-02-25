<script>
  import Line from 'svelte-chartjs/src/Line.svelte';
  import 'chartjs-plugin-datalabels';
  import { workingDays } from '../../dummyData';
  import {
    formatDataLabels,
    getAveragePerWeekData,
  } from '../../helpers/chartLogic';

  const {
    averages,
    backgroundColorCar,
    backgroundColorPublicTransport,
    labels,
    // maxForDisplay,
    title,
  } = getAveragePerWeekData(workingDays);

  let data = {
    labels,
    datasets: [
      {
        data: averages.averagesPerWeekCar,
        backgroundColor: backgroundColorCar,
        borderWidth: 0,
        barPercentage: 1,
      },
      {
        data: averages.averagesPersWeekPublicTransport,
        backgroundColor: backgroundColorPublicTransport,
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
          stacked: true,
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      yAxes: [
        {
          stacked: true,
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
            beginAtZero: true,
            // suggestedMax: maxForDisplay,
          },
        },
      ],
    },
    tooltips: {
      enabled: false,
    },
    plugins: {
      datalabels: {
        // anchor: 'end',
        // align: 'top',
        display: true,
        color: '#170a3a',
        formatter: (value) => formatDataLabels(value),
      },
    },
  };
</script>

<div class="chart-container">
  <Line {data} {options} />
</div>

<style>
  .chart-container {
    max-width: 600px;
    margin: 4rem auto;
  }
</style>
