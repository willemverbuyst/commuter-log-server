<script>
  import FormComponent from './Business/FormComponent.svelte';
  import LogInForm from './Business/LogInForm.svelte';
  import Button from './UI/Buttons/Button.svelte';
  import GaugeChart from './UI/Charts/GaugeChart.svelte';
  import AveragesPerWeekChart from './UI/Charts/AveragesPerWeekChart.svelte';
  import AllWorkingDays from './UI/Charts/AllWorkingDays.svelte';
  import CarVsPublicChart from './UI/Charts/CarVsPublicChart.svelte';
  import PartitionChart from './UI/Charts/PartitionChart.svelte';
  import TotalsPerWeekChart from './UI/Charts/TotalsPerWeekChart.svelte';
  import WeekChart from './UI/Charts/WeekChart.svelte';
  import Slider from './UI/Inputs/Slider.svelte';
  import Table from './UI/Table/Table.svelte';
  import {
    darkModeStore,
    showGridStore,
    isLoadingStore,
  } from './Store/appState';
  import { isSignedInStore, userStore } from './Store/userState';
  import { setColors } from './UI/colors.js';

  import LoadingSpinner from './UI/LoadingSpinner/LoadingSpinner.svelte';
  import { fetchLogData } from './Store/logActions';
  // import { postLogData } from './Store/logActions';
  import { logStore } from './Store/logState';

  let showForm = false;
  let showLogIn = false;
  let weekIndexInLogData = 0;
  let edittedId;

  // setColors();

  // For dev only
  // postLogData();

  function cancelForm() {
    showForm = false;
    showLogIn = false;
  }

  function loggingIn() {
    console.log('user logs in');
    showLogIn = false;
  }

  function signingOut() {
    console.log('user logs out');
  }

  function toggleMode() {
    darkModeStore.toggleMode();
    setColors($darkModeStore);
  }

  function toggleGrid() {
    showGridStore.toggleGrid();
  }

  function saveLogDate() {
    showForm = false;
  }

  function startEdit(event) {
    showForm = true;
    edittedId = event.detail;
  }

  function updateSelectedWeek(event) {
    weekIndexInLogData = event.target.value;
  }
</script>

<main>
  <!-- <div>{$userStore}</div> -->
  <div class="nav-container">
    {#if $isSignedInStore}
      <Button on:click={() => (showForm = true)}>Add Day</Button>
    {/if}
    <Button on:click={toggleGrid}
      >{$showGridStore ? 'Hide' : 'Show'} Grid</Button
    >
    <Button on:click={toggleMode}
      >{$darkModeStore ? 'Light' : 'Dark'} Mode</Button
    >
    {#if !$isSignedInStore}
      <Button on:click={() => (showLogIn = true)}>Log In</Button>
    {:else}
      <Button on:click={signingOut}>Sign out</Button>
    {/if}
  </div>
  <!-- {#if showLogIn}
    <LogInForm on:cancel={cancelForm} on:logIn={loggingIn} />
  {/if} -->

  <!-- {#if showForm}
    <FormComponent
      id={edittedId}
      on:cancel={cancelForm}
      on:save={saveLogDate}
    />
  {/if}  -->
  {#await fetchLogData()}
    <LoadingSpinner />
  {:then}
    <!-- <div class="slider-container">
      <Slider
        {weekIndexInLogData}
        on:change={(event) => updateSelectedWeek(event)}
        logData={$logStore}
      />
    </div>
    <div class="dashboard__section">
      <WeekChart
        logData={$logStore}
        showGrid={$showGridStore}
        {weekIndexInLogData}
      />
    </div> -->
    <!-- <div class="dashboard__section">
      <GaugeChart logData={$logStore} {weekIndexInLogData} />
    </div> -->
    <div class="dashboard__section">
      <AllWorkingDays logData={$logStore} showGrid={$showGridStore} />
    </div>
    <div class="dashboard__section">
      <TotalsPerWeekChart logData={$logStore} showGrid={$showGridStore} />
    </div>
    <div class="dashboard__section">
      <AveragesPerWeekChart logData={$logStore} showGrid={$showGridStore} />
    </div>
    <div class="dashboard__section">
      <PartitionChart logData={$logStore} />
      <CarVsPublicChart logData={$logStore} />
    </div>
    <!-- <div class="dashboard__section">
      <Table logData={$logData} on:edit={startEdit} />
    </div> -->
  {:catch}
    <p>something went wrong</p>
  {/await}
</main>

<style>
  main {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    text-align: center;
    margin: 1rem auto;
    color: black;
  }

  .dashboard__section {
    padding: 0;
    margin: 0 auto;
    width: 80vw;
    display: flex;
    justify-content: space-between;
  }

  .nav-container {
    margin-bottom: 1rem;
  }

  /* .slider-container {
    width: 1150px;
    margin: auto;
  } */
</style>
