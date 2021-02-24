<script>
  import Button from './ui/Button.svelte';
  import WeekChart from './UI/WeekChart.svelte';
  import FormComponent from './BusinessLogic/FormComponent.svelte';

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
  <WeekChart />
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
