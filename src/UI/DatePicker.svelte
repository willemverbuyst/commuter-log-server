<script>
  import Datepicker from 'svelte-calendar';

  export let selectedDate;
  export let updateSelectedDate;

  let minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
  let maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  let format = '#{l} #{j} #{M} #{Y}';
</script>

<div on:click={updateSelectedDate(selectedDate)}>
  <Datepicker
    {format}
    start={minDate}
    end={maxDate}
    bind:selected={selectedDate}
    buttonBackgroundColor="orange"
    buttonTextColor="white"
    highlightColor="orange"
    dayBackgroundColor="#efefef"
    dayTextColor="#333"
    dayHighlightedBackgroundColor="orange"
    dayHighlightedTextColor="#fff"
  />
</div>
