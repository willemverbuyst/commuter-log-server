<script>
  import { afterUpdate } from 'svelte';
  import 'chartjs-plugin-datalabels';
  import { formatDataLabels } from '../../Helpers/chartLogic/chartLogic';
  import { getCarVsPublicTotalsData } from '../../Helpers/chartLogic/carVsPublicChart';

  export let logData;

  let carVsPublicChart;
  let ctx;

  function createChart() {
    const { totalsCar, totalsPublic, labels, title } = getCarVsPublicTotalsData(
      logData
    );

    ctx = document.getElementById('carVsPublicChart').getContext('2d');

    const fillCar = 'rgba(0, 107, 151, 1)';
    const fillPublic = 'rgba(0, 187, 178, 1)';

    if (carVsPublicChart) carVsPublicChart.destroy();

    carVsPublicChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            data: [
              totalsCar.totalTimeTravelled,
              totalsPublic.totalTimeTravelled,
            ],
            backgroundColor: [fillCar, fillPublic],
            borderWidth: 0,
          },
        ],
      },
      options: {
        cutoutPercentage: 0,
        title: {
          display: true,
          text: title,
          fontColor: '#aaa',
        },
        maintainAspectRatio: true,
        legend: {
          position: 'bottom',
        },
        responsive: true,
        tooltips: {
          enabled: false,
        },
        plugins: {
          datalabels: {
            display: true,
            color: '#fff',
            formatter: (value) => formatDataLabels(value),
          },
        },
      },
    });
  }

  afterUpdate(createChart);
</script>

<div class="dashboard__container">
  <canvas id="carVsPublicChart" width="500" />
</div>
