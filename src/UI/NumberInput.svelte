<script>
  export let hours;
  export let minutes;
</script>

<div class="form-control">
  <div class="labels">hrs&nbsp;:&nbsp;min</div>

  <div class="number-inputs">
    <input class="hours" type="number" value={hours} on:input />
    &nbsp;:&nbsp;
    <input
      class="minutes"
      type="number"
      value={minutes}
      min="0"
      max="60"
      on:input
    />
  </div>
</div>

<style>
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }

  input {
    width: 40px;
    font: inherit;
    color: inherit;
    border: none;
    background: transparent;

    /* padding: 10px 20px; */
    transition: border-color 0.1s ease-out;
  }

  input.hours {
    text-align: right;
  }
  input.minutes {
    text-align: left;
  }

  input:focus {
    border-color: #f1f1f1;
    outline: none;
  }

  .labels,
  .number-inputs {
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
</style>
