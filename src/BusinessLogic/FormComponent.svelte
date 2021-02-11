<script>
  import InputComponent from '../UI/InputComponent.svelte';
  import Datepicker from 'svelte-calendar';

  let title = '';
  let minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
  let maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
</script>

<form>
  <InputComponent
    id="title"
    label="Title"
    value={title}
    on:input={(event) => (title = event.target.value)}
  />
  <Datepicker start={minDate} end={maxDate} />
</form>

<style>
  form {
    width: 50%;
    margin: auto;
  }
</style>
