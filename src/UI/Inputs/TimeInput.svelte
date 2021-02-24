<script>
  export let duration;
  export let valid = true;
  export let validityMessage = '';

  let touched = false;
</script>

<div class="form-control">
  <div class="labels">hrs&nbsp;:&nbsp;min</div>
  <div>
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
  input {
    width: 100px;
    font: inherit;
    color: inherit;
    border: none;
    background: transparent;
    margin: 2px;
    text-align: center;
  }

  input:focus {
    outline: none;
  }

  .labels {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .form-control {
    width: 300px;
    margin: 20px auto;
    border: 1px solid #170a3a;
    border-radius: 7px;
    padding: 10px 20px;
  }

  .invalid {
    border: 3px solid red;
  }

  .error-message {
    color: red;
    margin: 0.25rem 0;
  }
</style>
