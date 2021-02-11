<script>
  import InputComponent from '../UI/InputComponent.svelte';
  import Datepicker from 'svelte-calendar';

  let title = '';
  let minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
  let maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

  let selectedDate = new Date();
  let format = '#{l} #{j} #{M} #{Y}';
</script>

<form>
  <InputComponent
    id="title"
    label="Title"
    value={title}
    on:input={(event) => (title = event.target.value)}
  />
  <Datepicker
    {format}
    start={minDate}
    end={maxDate}
    bind:selected={selectedDate}
    buttonBackgroundColor="#e20074"
    buttonTextColor="white"
    highlightColor="#e20074"
    dayBackgroundColor="#efefef"
    dayTextColor="#333"
    dayHighlightedBackgroundColor="#e20074"
    dayHighlightedTextColor="#fff"
  />
</form>

<style>
  form {
    width: 50%;
    margin: auto;
  }
</style>
