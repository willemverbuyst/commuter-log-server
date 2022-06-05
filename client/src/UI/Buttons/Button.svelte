<script lang="ts">
  export let type: string = 'button';
  export let disabled: boolean = false;
</script>

<button {type} {disabled} on:click><slot /></button>

<style>
  button {
    font-family: 'Helvetica Neue';
    width: 12rem;
    font-size: 12px;
    line-height: 1.2;
    text-transform: uppercase;
    color: var(--main-txt-color);
    font-weight: bold;
    border: 1px solid var(--main-bg-color);
    border-radius: 7px;
    background: var(--main-bg-color);
    padding: 0.5rem 1rem;
    cursor: pointer;
    text-decoration: none;
    box-shadow: inset 1px 1px 1px var(--main-bg-color-light),
      inset -1px -1px 1px var(--main-bg-color-dark);
    transition: 0.3s ease-in;
  }

  button:focus,
  button:hover {
    outline: none;
  }

  button:active {
    box-shadow: inset 1px 1px 1px var(--main-bg-color-dark),
      inset -1px -1px 1px var(--main-bg-color-light);
  }
</style>
