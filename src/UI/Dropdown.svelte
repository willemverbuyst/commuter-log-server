<script>
  export let route;
  export let routes;
  export let label;
</script>

<div class="form-control">
  <label for={label}>{label}</label>
  <!-- svelte-ignore a11y-no-onchange -->
  <select value={route} on:change>
    {#each routes as r}
      <option value={r}>{r}</option>
    {/each}
  </select>
</div>

<style>
  select {
    width: 300px;
    font: inherit;
    color: inherit;
    border: 1px solid #fff;
    border-radius: 7px;
    background: transparent;
    padding: 10px 20px;
    transition: border-color 0.1s ease-out;
    cursor: pointer;
  }

  select:focus {
    outline: none;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    width: 100%;
  }

  .form-control {
    padding: 0.5rem 0;
    width: 100%;
    margin: 0.25rem 0;
  }
</style>
