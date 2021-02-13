<script>
  import Bar from 'svelte-chartjs/src/Bar.svelte';

  let data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '% of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          '#e20074',
          '#e20074',
          '#e20074',
          '#e20074',
          '#e20074',
          '#e20074',
        ],
      },
    ],
  };

  let options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barPercentage: 1,
          gridLines: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)',
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)',
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
</script>

<Bar {data} {options} width={100} height={50} />
