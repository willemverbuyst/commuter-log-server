<script>
  export let type = 'button';
  export let disabled = false;
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
    color: #aaa;
    font-weight: light;
    background: #222;
    border: 1px solid #222;
    padding: 0.5rem 1rem;
    margin: 0.5rem 0;
    cursor: pointer;
    text-decoration: none;
    box-shadow: inset 2px 2px 2px #333, inset -2px -2px 2px #111;
    transition: 0.3s ease-in;
  }

  button:focus,
  button:hover {
    outline: none;
  }

  button:active {
    box-shadow: inset 2px 2px 2px #111, inset -2px -2px 2px #333;
  }
</style>
