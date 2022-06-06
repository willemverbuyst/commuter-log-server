<script>
  export let label;
  export let options;
  export let value;
</script>

<div class="table-dropdown__container">
  <div class="table-dropdown__label">{label}</div>
  <!-- svelte-ignore a11y-no-onchange -->
  <select {value} on:change>
    {#each options as option}
      <option value={option}>{option}</option>
    {/each}
  </select>
</div>

<style>
  .table-dropdown__container {
    width: 100%;
  }

  .table-dropdown__label {
    margin-bottom: 10px;
    text-transform: uppercase;
  }

  select {
    font-family: 'Helvetica Neue';
    width: 100%;
    font-size: 12px;
    line-height: 1.2;
    text-transform: uppercase;
    color: var(--main-txt-color);
    font-weight: light;
    border: 1px solid var(--main-bg-color);
    border-top: 0px;
    background: var(--main-bg-color);
    padding: 0.8rem 1rem;
    cursor: pointer;
    text-decoration: none;
    box-shadow: inset 1px 1px 1px var(--main-bg-color-light),
      inset -1px -1px 1px var(--main-bg-color-dark);
    transition: 0.3s ease-in;
  }

  select:focus,
  select:hover {
    outline: none;
  }

  select:active {
    box-shadow: inset 1px 1px 1px var(--main-bg-color-dark),
      inset -1px -1px 1px var(--main-bg-color-light);
  }
</style>
