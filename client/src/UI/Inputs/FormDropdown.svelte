<script>
  export let value;
  export let routes;
  export let title;
</script>

<div class="trip-input__container">
  <div class="trip-input__label">{title}</div>
  <!-- svelte-ignore a11y-no-onchange -->
  <select on:change bind:value>
    {#each routes as r}
      <option value={r}>{r}</option>
    {/each}
  </select>
</div>

<style>
  .trip-input__container {
    /* width: 250px; */
    margin: 20px 0;
    display: flex;
    flex-direction: column;
  }

  .trip-input__label {
    width: 100%;
    color: var(--main-txt-color);
    margin-bottom: 5px;
  }

  select {
    box-sizing: border-box;
    width: 100%;
    padding: 15px;
    margin: 0;
    font: inherit;
    color: inherit;
    border: none;
    background: var(--main-bg-color-dark);
    transition: border-color 0.1s ease-out;
    cursor: pointer;
    border: none;
    box-shadow: inset 2px 2px 2px var(--main-bg-color-darker),
      inset -2px -2px 2px var(--main-bg-color);
  }

  select:focus {
    outline: none;
  }
</style>
