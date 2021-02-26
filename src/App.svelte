<script>
  import Button from './UI/Components/Button.svelte';
  import FormComponent from './BusinessLogic/FormComponent.svelte';
  import AveragesPerWeekChart from './UI/Charts/AveragesPerWeekChart.svelte';
  import PartitionChart from './UI/Charts/PartitionChart.svelte';
  import WeekChart from './UI/Charts/WeekChart.svelte';
  import CarVsOPublicTransportChart from './UI/Charts/CarVsPublicTransportChart.svelte';
  import AllWorkingDays from './UI/Charts/AllWorkingDays.svelte';
  import TotalsPerWeekChart from './UI/Charts/TotalsPerWeekChart.svelte';

  let showForm = false;

  function cancelForm() {
    showForm = false;
  }
</script>

<main>
  <Button on:click={() => (showForm = true)}>Add Working Day</Button>
  {#if showForm}
    <FormComponent on:cancel={cancelForm} />
  {/if}
  <TotalsPerWeekChart />
  <AllWorkingDays />
  <WeekChart />
  <AveragesPerWeekChart />
  <PartitionChart />
  <CarVsOPublicTransportChart />
</main>

<style>
  main {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    padding: 1em;
    margin: 5rem auto;
  }
</style>
