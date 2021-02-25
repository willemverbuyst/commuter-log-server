<script>
  import Line from 'svelte-chartjs/src/Line.svelte';
  import 'chartjs-plugin-datalabels';
  import { workingDays } from '../../dummyData';
  import {
    formatDataLabels,
    getAllWorkingDaysData,
  } from '../../helpers/chartLogic';

  const {
    travelTimes,
    backgroundColor,
    maxForDisplay,
    labels,
    title,
    lineValue,
  } = getAllWorkingDaysData(workingDays);

  let data = {
    labels,
    datasets: [
      {
        data: travelTimes,
        backgroundColor,
        borderWidth: 0,
        barPercentage: 1,
      },
      {
        label: 'Line Dataset',
        data: lineValue,
        type: 'line',
        fill: false,
        borderColor: 'purple',
        // this dataset is drawn on top
        order: 2,
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
    elements: {
      point: {
        radius: 0,
      },
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
        display: false,
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
