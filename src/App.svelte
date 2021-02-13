<script>
  import FormComponent from './BusinessLogic/FormComponent.svelte';

  let showForm = false;

  function cancelForm() {
    showForm = false;
  }
</script>

<main>
  <h1>DASHBOARD</h1>
  <button on:click={() => (showForm = true)}>Add Working Day</button>
  {#if showForm}
    <FormComponent on:cancel={cancelForm} {showForm} />
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>
