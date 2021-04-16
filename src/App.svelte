<script lang="ts">
  import firebase from 'firebase/app';
  import 'firebase/auth';
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
  import { darkModeStore, showGridStore } from './Store/appState';
  import { setColors } from './UI/colors.js';
  import logData from './Store/logState';
  // import { workingDays } from './dummyData';
  import LoadingSpinner from './UI/LoadingSpinner/LoadingSpinner.svelte';
  import type { LogDate } from './models/Logdata';
  import { firebaseConfig } from './Firebase/config';

  let showForm = false;
  let showLogIn = false;
  let isLoading = true;
  let signedIn = false;
  let weekIndexInLogData = 0;
  let edittedId: string;

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // @ts-ignore
  fetch(`${__myapp.env.DATABASE}/logdata.json`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Fetching logdata failed, please try again!');
      }
      return res.json();
    })
    .then((data) => {
      const loadedLogData: LogDate[] = [];
      for (const key in data) {
        loadedLogData.push({
          ...data[key],
          id: key,
          date: new Date(data[key].date),
        });
      }
      setTimeout(() => {
        isLoading = false;
        logData.setLogData(loadedLogData);
      }, 1000);
    })
    .catch((err) => {
      //error = err;
      isLoading = false;
      console.log(err);
    });

  function cancelForm() {
    showForm = false;
    showLogIn = false;
  }

  function logIn() {
    console.log('user logs in');
    showLogIn = false;
    signedIn = true;
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

  function signOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        signedIn = false;
      })
      .catch((error) => {
        // An error happened.
      });
    console.log(signedIn);
  }

  function startEdit(event: any) {
    showForm = true;
    edittedId = event.detail;
  }

  function updateSelectedWeek(event: any) {
    weekIndexInLogData = event.target.value;
  }
</script>

<main>
  <div class="nav-container">
    <Button on:click={() => (showForm = true)}>Add Day</Button>
    <Button on:click={toggleGrid}
      >{$showGridStore ? 'Hide' : 'Show'} Grid</Button
    >
    <Button on:click={toggleMode}
      >{$darkModeStore ? 'Light' : 'Dark'} Mode</Button
    >
    {#if !signedIn}
      <Button on:click={() => (showLogIn = true)}>Log In</Button>
    {:else}
      <Button on:click={signOut}>Sign out</Button>
    {/if}
  </div>
  {#if isLoading}
    <LoadingSpinner />
  {:else}
    <div class="slider-container">
      <Slider
        {weekIndexInLogData}
        on:change={(event) => updateSelectedWeek(event)}
        logData={$logData}
      />
    </div>
    {#if showLogIn}
      <LogInForm on:cancel={cancelForm} on:logIn={logIn} />
    {/if}

    {#if showForm}
      <FormComponent
        id={edittedId}
        on:cancel={cancelForm}
        on:save={saveLogDate}
      />
    {/if}

    <div class="dashboard__section">
      <WeekChart
        logData={$logData}
        showGrid={$showGridStore}
        {weekIndexInLogData}
      />
      <GaugeChart logData={$logData} {weekIndexInLogData} />
    </div>
    <div class="dashboard__section">
      <AllWorkingDays logData={$logData} showGrid={$showGridStore} />
    </div>
    <div class="dashboard__section">
      <TotalsPerWeekChart logData={$logData} showGrid={$showGridStore} />
    </div>
    <div class="dashboard__section">
      <AveragesPerWeekChart logData={$logData} showGrid={$showGridStore} />
    </div>
    <div class="dashboard__section">
      <PartitionChart logData={$logData} />
      <CarVsPublicChart logData={$logData} />
    </div>
    <div class="dashboard__section">
      <Table logData={$logData} on:edit={startEdit} />
    </div>
  {/if}
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

  .dashboard__section {
    padding: 0;
    margin: 0 auto;
    width: 1218px;
    display: flex;
    justify-content: space-between;
  }

  .nav-container {
    margin-bottom: 1rem;
  }

  .slider-container {
    width: 1150px;
    margin: auto;
  }
</style>
