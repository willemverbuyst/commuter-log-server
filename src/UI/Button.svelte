<script>
  export let type = 'button';
  export let disabled = false;
</script>

<button {type} {disabled} on:click><slot /></button>

<style>
  button {
    font: inherit;
    border: 1px solid #fff;
    border-radius: 7px;
    background: #e20074;
    padding: 0.5rem 1rem;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
  }

  button:focus {
    outline: none;
  }

  button:hover,
  button:active {
    background: #e20074;
    border-color: #e20074;
  }

  button:disabled,
  button:disabled:hover,
  button:disabled:active {
    background: #ccc;
    border-color: #ccc;
    color: #959595;
    box-shadow: none;
    cursor: not-allowed;
  }
</style>
