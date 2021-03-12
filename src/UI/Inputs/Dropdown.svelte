<script>
  export let route;
  export let routes;
</script>

<div class="trip-input__container">
  <div class="trip-input__label">Trip One</div>
  <!-- svelte-ignore a11y-no-onchange -->
  <select value={route} on:change>
    {#each routes as r}
      <option value={r}>{r}</option>
    {/each}
  </select>
</div>

<style>
  .trip-input__container {
    width: 250px;
    margin: 20px 0;
    display: flex;
    flex-direction: column;
  }

  .trip-input__label {
    width: 100%;
    color: rgba(170, 170, 170, 0.3);
  }

  select {
    box-sizing: border-box;
    width: 100%;
    padding: 15px;
    margin: 0;
    font: inherit;
    color: inherit;
    border: none;
    background: transparent;
    transition: border-color 0.1s ease-out;
    cursor: pointer;
    border: none;
    box-shadow: inset 2px 2px 2px #111, inset -2px -2px 2px #333;
  }

  select:focus {
    outline: none;
  }
</style>
