<script>
  export let route;
  export let routes;
</script>

<div class="time-input__container">
  <div class="time-input__label">Trip One</div>
  <!-- svelte-ignore a11y-no-onchange -->
  <select value={route} on:change>
    {#each routes as r}
      <option value={r}>{r}</option>
    {/each}
  </select>
</div>

<style>
  .time-input__container {
    width: 200px;
    margin: 20px auto;
    /* border: 1px solid #aaa;
    border-radius: 7px; */
    border: 2px solid #333;
    border-radius: 7px;
    box-shadow: inset 2px 2px 2px #222, inset -2px -2px 2px #444;
    padding: 10px 0;
    position: relative;
  }

  .time-input__label {
    text-align: left;
    padding: 0 0.5rem;
    position: absolute;
    top: -10px;
    left: 10px;
    background-color: #333;
    /* z-index: -200; */
    /* background-color: rgba(0, 0, 0, 0.3); */
    /* backdrop-filter: blur(10px) saturate(100%) contrast(45%) brightness(130%); */
  }

  select {
    width: 90%;
    padding: 0 0.5rem 0 0;
    margin: 0.5rem 0 0 0;
    font: inherit;
    color: inherit;
    border: none;
    background: transparent;
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
</style>
