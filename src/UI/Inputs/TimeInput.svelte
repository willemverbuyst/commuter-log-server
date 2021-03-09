<script>
  export let duration;
  export let valid = true;
  export let validityMessage = '';

  let touched = false;
</script>

<div class="time-input__container">
  <div class="time-input__label">hrs&nbsp;:&nbsp;min</div>
  <div class="time-input__input">
    <input
      type="text"
      value={duration}
      {validityMessage}
      class:invalid={!valid && touched}
      on:input
      on:blur={() => (touched = true)}
    />

    {#if validityMessage && !valid && touched}
      <p class="error-message">{validityMessage}</p>
    {/if}
  </div>
</div>

<style>
  .time-input__container {
    width: 100px;
    margin: 20px auto;
    border: 1px solid #aaa;
    border-top: none;
    border-radius: 7px;
    padding: 10px 0;
    position: relative;
  }

  .time-input__label {
    width: 100%;
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 200;
  }

  input {
    width: 100%;
    padding: 0;
    margin: 0.5rem 0 0 0;
    font: inherit;
    color: inherit;
    border: none;
    background: transparent;
    text-align: center;
  }

  input:focus {
    outline: none;
  }

  .invalid {
    border: 3px solid red;
  }

  .error-message {
    color: red;
    margin: 0.25rem 0;
  }
</style>
