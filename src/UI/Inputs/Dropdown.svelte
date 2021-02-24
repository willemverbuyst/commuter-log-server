<script>
  export let route;
  export let routes;
</script>

<div class="form-control">
  <!-- svelte-ignore a11y-no-onchange -->
  <select value={route} on:change>
    {#each routes as r}
      <option value={r}>{r}</option>
    {/each}
  </select>
</div>

<style>
  select {
    width: 340px;
    font: inherit;
    color: inherit;
    border: 1px solid #170a3a;
    border-radius: 7px;
    background: transparent;
    padding: 10px 0;
    transition: border-color 0.1s ease-out;
    cursor: pointer;
  }

  select:focus {
    outline: none;
  }

  /* label {
    display: block;
    margin-bottom: 0.5rem;
    width: 100%;
  } */

  .form-control {
    width: 100%;
  }
</style>
