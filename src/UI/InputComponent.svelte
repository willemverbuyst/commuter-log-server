<script>
  export let id;
  export let label;
  export let value;
  export let type = 'text';
</script>

<div class="form-control">
  <label for="title">{label}</label>
  <input {type} {id} {value} on:input />
</div>

<style>
  input {
    display: block;
    width: 100%;
    font: inherit;
    border: 2px solid #ccc;
    border-radius: 3px 3px 0 0;
    background: transparent;
    padding: 0.15rem 0.25rem;
    transition: border-color 0.1s ease-out;
  }

  input:focus {
    border-color: #f1f1f1;
    outline: none;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    width: 100%;
  }

  .form-control {
    padding: 0.5rem 0;
    width: 100%;
    margin: 0.25rem 0;
  }
</style>
