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
