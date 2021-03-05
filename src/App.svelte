<script>
  import Button from './UI/Buttons/Button.svelte';
  import FormComponent from './BusinessLogic/FormComponent.svelte';
  import AveragesPerWeekChart from './UI/Charts/AveragesPerWeekChart.svelte';
  import PartitionChart from './UI/Charts/PartitionChart.svelte';
  import WeekChart from './UI/Charts/WeekChart.svelte';
  import CarVsPublicChart from './UI/Charts/CarVsPublicChart.svelte';
  import AllWorkingDays from './UI/Charts/AllWorkingDays.svelte';
  import TotalsPerWeekChart from './UI/Charts/TotalsPerWeekChart.svelte';
  import Table from './UI/Table/Table.svelte';
  import showGrid from './Store/appState';
  import showGridStore from './Store/appState';

  let showForm = false;

  function cancelForm() {
    showForm = false;
  }

  function toggleGrid() {
    showGrid.toggleGrid();
  }
</script>

<main>
  <Button on:click={() => (showForm = true)}>Add Day</Button>
  <Button on:click={toggleGrid}>Show Grid</Button>
  <p>{$showGrid}</p>
  {#if showForm}
    <FormComponent on:cancel={cancelForm} />
  {/if}
  <div class="chart-container">
    <TotalsPerWeekChart showGrid={$showGrid} />
    <AllWorkingDays showGrid={$showGrid} />
  </div>
  <div class="chart-container">
    <Table />
  </div>
  <div class="chart-container">
    <WeekChart />
    <AveragesPerWeekChart showGrid={$showGrid} />
  </div>
  <div class="chart-container">
    <PartitionChart />
    <CarVsPublicChart />
  </div>
</main>

<style>
  main {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    margin: 1rem auto;
  }
  .chart-container {
    padding: 0;
    margin: 0;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
</style>
