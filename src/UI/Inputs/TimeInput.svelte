<script>
  export let duration;
  export let valid = true;
  export let validityMessage = '';

  let touched = false;
</script>

<div class="time-input__container">
  <div class="time-input__label">hh:mm</div>
  <div class="time-input__input">
    <input
      type="text"
      value={duration}
      {validityMessage}
      class:invalid={!valid && touched}
      on:input
      on:blur={() => (touched = true)}
    />
  </div>
</div>
{#if validityMessage && !valid && touched}
  <p class="error-message">{validityMessage}</p>
{/if}

<style>
  .time-input__container {
    width: 100px;
    margin: 20px 0 20px 1rem;
    display: flex;
    flex-direction: column;
  }

  .time-input__label {
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
