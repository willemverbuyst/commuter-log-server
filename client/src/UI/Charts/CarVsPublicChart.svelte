<script>
  import { afterUpdate } from 'svelte';
  import 'chartjs-plugin-datalabels';
  import { formatDuration } from '../../helpers/formatting';
  import { getCarVsPublicTotalsData } from '../../helpers/chartLogic/carVsPublicChart';
  import {
    colorDatalabels,
    colorTitle,
    colorTravelByCar,
    colorTravelByPublicTransport,
  } from '../colors';
  import Chart from 'chart.js';

  export let logData;

  let carVsPublicChart;
  let ctx;

  function createChart() {
    const { totalsCar, totalsPublic, labels, title } =
      getCarVsPublicTotalsData(logData);

    const canvas = document.getElementById('carVsPublicChart');
    ctx = canvas.getContext('2d');

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
            backgroundColor: [colorTravelByCar, colorTravelByPublicTransport],
            borderWidth: 0,
          },
        ],
      },
      options: {
        cutoutPercentage: 0,
        title: {
          display: true,
          text: title,
          fontColor: colorTitle,
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
            color: colorDatalabels,
            formatter: (value) => formatDuration(value),
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
