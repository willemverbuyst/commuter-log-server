<script>
  export let costs;
  export let valid = true;
  export let validityMessage = '';

  let touched = false;
</script>

<div class="form-control">
  <div class="labels">Costs</div>
  <div>
    <input
      type="text"
      value={costs}
      {validityMessage}
      class:invalid={!valid && touched}
      on:input
      on:blur={() => (touched = true)}
    />
    <span>€</span>
    {#if validityMessage && !valid && touched}
      <p class="error-message">{validityMessage}</p>
    {/if}
  </div>
</div>

<style>
  input {
    width: 40px;
    font: inherit;
    color: inherit;
    border: none;
    background: transparent;
    margin: 2px 0;
    padding: 2px 0;
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
    border: 1px solid #fff;
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
