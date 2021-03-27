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
    color: rgba(170, 170, 170, 0.3);
    font-weight: light;
    border: 1px solid #333;
    border-top: 0px;
    background: #333;
    padding: 0.8rem 1rem;
    cursor: pointer;
    text-decoration: none;
    box-shadow: inset 1px 1px 1px #444, inset -1px -1px 1px #222;
    transition: 0.3s ease-in;
  }

  select:focus,
  select:hover {
    outline: none;
    /* box-shadow: inset 1px 1px 1px #222, inset -1px -1px 1px #444; */
  }

  select:active {
    box-shadow: inset 1px 1px 1px #222, inset -1px -1px 1px #444;
  }
</style>
