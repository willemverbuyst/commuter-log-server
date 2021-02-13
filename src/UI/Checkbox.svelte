<script>
  export let value;
  export let label;
</script>

<div class="form-control">
  <label>
    <input type="checkbox" on:change {value} />
    {label}
  </label>
</div>

<style>
  input {
    /* width: 300px; */
    font: inherit;
    color: inherit;
    border: 1px solid #fff;
    border-radius: 7px;
    background: transparent;
    padding: 10px 20px;
    transition: border-color 0.1s ease-out;
  }

  input:focus {
    border-color: #f1f1f1;
    outline: none;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    /* width: 100%; */
  }

  .form-control {
    padding: 0.5rem 0;
    /* width: 100%; */
    margin: 0.25rem 0;
  }
</style>
