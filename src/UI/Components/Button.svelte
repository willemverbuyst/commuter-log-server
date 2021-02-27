<script>
  export let type = 'button';
  export let disabled = false;
</script>

<button {type} {disabled} on:click><slot /></button>

<style>
  button {
    font-family: 'Helvetica Neue';
    size: 12px;
    line-height: 1.2;
    text-transform: uppercase;
    border: 2px solid #333;
    border-radius: 7px;
    background: #333;
    padding: 0.5rem 1rem;
    color: #aaa;
    cursor: pointer;
    text-decoration: none;
    box-shadow: inset 4px 4px 4px #444, inset -4px -4px 4px #222;
    transition: 0.3s ease-in;
  }

  button:focus,
  button:hover {
    outline: none;
    box-shadow: inset 2px 2px 2px #444, inset -2px -2px 2px #222;
  }

  button:active {
    box-shadow: inset 4px 4px 4px #222, inset -4px -4px 4px #444;
  }
</style>
