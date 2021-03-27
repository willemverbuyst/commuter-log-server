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
    buttonBackgroundColor="var(--main-bg-color-dark)"
    buttonTextColor="var(--main-txt-color)"
    highlightColor="purple"
    dayBackgroundColor="rgba(255, 0, 128, 1)"
    dayTextColor="var(--main-bg-color-dark)"
    dayHighlightedBackgroundColor="var(--main-bg-color-dark)"
    dayHighlightedTextColor="var(--main-txt-color)"
  />
</div>

<style>
  .container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>
