<script>
  export let value;
  export let label;
  export let valid = true;
  export let validityMessage = '';
  export let type;

  let touched = false;
</script>

<div class="text-input__container">
  <div class="text-input__label">{label}</div>
  <input
    {type}
    {value}
    {validityMessage}
    class:invalid={!valid && touched}
    on:input
    on:blur={() => (touched = true)}
  />
</div>
{#if validityMessage && !valid && touched}
  <p class="error-message">{validityMessage}</p>
{/if}

<style>
  .text-input__container {
    width: 100%;
    margin: 20px 0;
    display: flex;
    flex-direction: column;
  }

  .text-input__label {
    width: 100%;
    color: rgba(170, 170, 170, 0.3);
    margin-bottom: 5px;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    padding: 1rem 0;
    font: inherit;
    color: inherit;
    border: none;
    background: transparent;
    text-align: center;
    box-shadow: inset 2px 2px 2px #111, inset -2px -2px 2px #333;
  }

  input:focus {
    outline: none;
  }

  .invalid {
    border: 2px solid #222;
    box-shadow: inset 2px 2px 2px #333, inset -2px -2px 2px #111;
  }

  .error-message {
    color: #aaa;
    margin: 0.25rem 0;
  }
</style>
