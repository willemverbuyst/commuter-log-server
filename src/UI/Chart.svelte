<script>
  import Bar from 'svelte-chartjs/src/Bar.svelte';
  import 'chartjs-plugin-datalabels';

  let travelTimes = [300, 70, 70, 70, 130, 130];
  const max = Math.max(...travelTimes) * 1.2;

  function formatDataLabels(value) {
    if (value % 60 === 0) {
      return `0${Math.floor(value / 60)}:00`;
    }
    return `0${Math.floor(value / 60)}:${value % 60}`;
  }

  let data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        data: travelTimes,
        backgroundColor: [
          '#e20074',
          '#e20074',
          '#e20074',
          '#e20074',
          '#e20074',
        ],
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
