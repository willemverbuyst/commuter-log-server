<script>
  import InputComponent from '../UI/InputComponent.svelte';

  let title = '';
</script>

<form>
  <InputComponent
    id="title"
    label="Title"
    value={title}
    on:input={(event) => (title = event.target.value)}
  />
</form>

<style>
  form {
    width: 50%;
    margin: auto;
  }
</style>
