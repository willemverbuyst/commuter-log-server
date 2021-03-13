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
  import Slider from './UI/Inputs/Slider.svelte';
  import GaugeChart from './UI/Charts/GaugeChart.svelte';

  let showForm = false;
  let selectedWeek = '5';

  function cancelForm() {
    showForm = false;
  }

  function toggleGrid() {
    showGrid.toggleGrid();
  }

  logData.setLogData(workingDays);

  function updateSelectedWeek(event) {
    selectedWeek = event.target.value;
  }
</script>

<main>
  <div class="nav-container">
    <Button on:click={() => (showForm = true)}>Add Day</Button>
    <Button on:click={toggleGrid}>{$showGrid ? 'Hide' : 'Show'} Grid</Button>
  </div>

  <div class="slider-container">
    <Slider
      weekNumber={selectedWeek}
      on:change={(event) => updateSelectedWeek(event)}
    />
  </div>
  {#if showForm}
    <FormComponent on:cancel={cancelForm} />
  {/if}
  <div class="chart-container">
    <WeekChart showGrid={$showGrid} logData={$logData} {selectedWeek} />
    <GaugeChart logData={$logData} {selectedWeek} />
  </div>
  <div class="chart-container">
    <Card
      logData={$logData}
      {selectedWeek}
      on:click={() => (showForm = true)}
    />
  </div>
  <div class="chart-container">
    <AllWorkingDays showGrid={$showGrid} logData={$logData} />
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

  .nav-container {
    margin-bottom: 1rem;
  }

  .slider-container {
    width: 80%;
    margin: auto;
  }
</style>
