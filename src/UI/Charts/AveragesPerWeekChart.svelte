<script>
  import Line from 'svelte-chartjs/src/Line.svelte';
  import 'chartjs-plugin-datalabels';
  import { workingDays } from '../../dummyData';
  import { formatDataLabels } from '../../helpers/chartLogic/chartLogic';
  import { getAveragePerWeekData } from '../../helpers/chartLogic/averagesChart';

  const {
    averages,
    backgroundColor,
    labels,
    maxForDisplay,
    title,
  } = getAveragePerWeekData(workingDays);

  let data = {
    labels,
    datasets: [
      {
        data: averages,
        fill: false,
        borderColor: backgroundColor,
        borderWidth: 3,
        barPercentage: 1,
        steppedLine: 'middle',
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
  <Line {data} {options} />
</div>

<style>
  .chart-container {
    max-width: 600px;
    margin: 4rem auto;
  }
</style>
