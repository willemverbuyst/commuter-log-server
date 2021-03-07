<script>
  import { getWeekNumber } from '../../Helpers/chartLogic/chartLogic';
  import { formatDuration } from '../../Helpers/formatting';
  import Button from '../Buttons/Button.svelte';

  export let logData;
  export let selectedWeek;
  let logDates;

  $: logDates = logData.filter(
    (d) => getWeekNumber(d.date)[1] === +selectedWeek
  );
</script>

<div class="table-container">
  <div class="table-title">Week {selectedWeek}</div>
  <div class="card-container">
    {#each logDates as logDate}
      <div class="card">
        <div>
          <p>{logDate.date.toString().slice(0, 15)}</p>
        </div>
        {#if logDate.holiday}
          <p>Day off</p>
          <Button on:click>Edit</Button>
        {:else if logDate.workingFromHome}
          <div><p>Working from home</p></div>
          <div><Button on:click>Edit</Button></div>
        {:else}
          <div>
            <p>{logDate.meansOfTransport}</p>
            <p>{logDate.routeTripOne}</p>
            <p>{logDate.routeTripTwo}</p>
            <p class="tc--align-right">
              {formatDuration(
                logDate.durationTripOne + logDate.durationTripTwo
              )}
            </p>
          </div>
          <div>
            <Button on:click>Edit</Button>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .table-container {
    width: 80%;
    font-family: 'Helvetica Neue';
    font-size: 12px;
    line-height: 1.2;
    color: #aaa;
    margin-top: 4rem;
    padding: 2rem;
    border: 2px solid #333;
    border-radius: 7px;
    box-shadow: inset 4px 4px 4px #222, inset -4px -4px 4px #444;
  }

  .table-title {
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .card-container {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }

  .card {
    border: 2px solid #333;
    /* border-radius: 7px; */
    box-shadow: inset 1px 1px 1px #444, inset -1px -1px 1px #222;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
