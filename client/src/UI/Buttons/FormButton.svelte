<script lang="ts">
  export let type: string = 'button';
  export let disabled: boolean = false;
</script>

<button {type} {disabled} on:click><slot /></button>

<style>
  button {
    font-family: 'Helvetica Neue';
    width: 100%;
    height: 3rem;
    font-size: 12px;
    line-height: 1.2;
    text-transform: uppercase;
    color: var(--main-txt-color);
    font-weight: light;
    background: var(--main-bg-color-dark);
    border: 1px solid var(--main-bg-color-dark);
    padding: 0.5rem 1rem;
    margin: 0.5rem 0;
    cursor: pointer;
    text-decoration: none;
    box-shadow: inset 2px 2px 2px var(--main-bg-color),
      inset -2px -2px 2px var(--main-bg-color-darker);
    transition: 0.3s ease-in;
  }

  button:focus,
  button:hover {
    outline: none;
  }

  button:active {
    box-shadow: inset 2px 2px 2px var(--main-bg-color-darker),
      inset -2px -2px 2px var(--main-bg-color);
  }
</style>
