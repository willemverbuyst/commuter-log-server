<script>
  import Datepicker from 'svelte-calendar';

  export let selectedDate;
  export let updateSelectedDate;

  let minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
  let maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  let format = '#{l} #{j} #{M} #{Y}';
</script>

<div class="container" on:click={updateSelectedDate(selectedDate)}>
  <Datepicker
    {format}
    start={minDate}
    end={maxDate}
    bind:selected={selectedDate}
    buttonBackgroundColor="#222"
    buttonTextColor="#aaa"
    highlightColor="purple"
    dayBackgroundColor="rgba(255, 0, 128, 1)"
    dayTextColor="#222"
    dayHighlightedBackgroundColor="#222"
    dayHighlightedTextColor="#aaa"
  />
</div>

<style>
  .container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>
