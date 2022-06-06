<script>
  export let value;
  export let label;
  export let valid = true;
  export let validityMessage;
  export let type;

  let touched = false;

  function typeAction(node) {
    node.type = type;
  }
</script>

<div class="text-input__container">
  <div class="text-input__label">{label}</div>
  <input
    use:typeAction
    class:invalid={!valid && touched}
    bind:value
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
    color: var(--main-txt-color);
    margin-bottom: 5px;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    padding: 1rem 0;
    font: inherit;
    color: inherit;
    border: none;
    background: var(--main-bg-color-dark);
    text-align: center;
    box-shadow: inset 2px 2px 2px var(--main-bg-color-darker),
      inset -2px -2px 2px var(--main-bg-color);
  }

  input:focus {
    outline: none;
  }

  .invalid {
    border: 2px solid var(--main-bg-color-dark);
    box-shadow: inset 2px 2px 2px var(--main-bg-color),
      inset -2px -2px 2px var(--main-bg-color-darker);
  }

  .error-message {
    color: var(--main-txt-color);
    margin: 0.25rem 0;
  }
</style>
