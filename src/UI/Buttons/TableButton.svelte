<script>
  export let type = 'button';
  export let disabled = false;
</script>

<button {type} {disabled} on:click><slot /></button>

<style>
  button {
    font-family: 'Helvetica Neue';
    height: 100%;
    font-size: 12px;
    line-height: 1.2;
    text-transform: uppercase;
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

  button:focus,
  button:hover {
    outline: none;
    /* box-shadow: inset 1px 1px 1px #222, inset -1px -1px 1px #444; */
  }

  button:active {
    box-shadow: inset 1px 1px 1px #222, inset -1px -1px 1px #444;
  }
</style>
