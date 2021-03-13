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
  import Card from './UI/Card/Card.svelte';
  import showGrid from './Store/appState';
  import logData from './Store/logState';
  import { workingDays } from './dummyData';

  let showForm = false;
  let selectedWeek = '5';

  function cancelForm() {
    showForm = false;
  }

  function toggleGrid() {
    showGrid.toggleGrid();
  }

  logData.setLogData(workingDays);
</script>

<main>
  <!-- svelte-ignore a11y-no-onchange -->
  <select bind:value={selectedWeek}>
    <option value="4">WEEK 4</option>
    <option value="5">WEEK 5</option>
    <option value="6">WEEK 6</option>
  </select>
  <Button on:click={() => (showForm = true)}>Add Day</Button>
  <Button on:click={toggleGrid}>{$showGrid ? 'Hide' : 'Show'} Grid</Button>
  {#if showForm}
    <FormComponent on:cancel={cancelForm} />
  {/if}
  <div class="chart-container">
    <WeekChart showGrid={$showGrid} logData={$logData} {selectedWeek} />
    <AllWorkingDays showGrid={$showGrid} logData={$logData} />
  </div>
  <div class="chart-container">
    <Card
      logData={$logData}
      {selectedWeek}
      on:click={() => (showForm = true)}
    />
  </div>
  <div class="chart-container">
    <TotalsPerWeekChart showGrid={$showGrid} logData={$logData} />
    <AveragesPerWeekChart showGrid={$showGrid} logData={$logData} />
  </div>
  <div class="chart-container">
    <PartitionChart logData={$logData} />
    <CarVsPublicChart logData={$logData} />
  </div>
  <div class="chart-container">
    <Table logData={$logData} on:click={() => (showForm = true)} />
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
