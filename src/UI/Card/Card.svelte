<script>
  import { getWeekNumber } from '../../Helpers/chartLogic/chartLogic';
  import { formatDuration } from '../../Helpers/formatting';
  import CardButton from '../Buttons/CardButton.svelte';

  export let logData;
  export let selectedWeek;
  let logDates;

  $: logDates = logData.filter(
    (d) => getWeekNumber(d.date)[1] === +selectedWeek
  );
</script>

<div class="card-container--outer">
  <div class="card-container--inner">
    {#each logDates as logDate}
      <div class="card">
        <div class="card-content">
          <div>
            <h3>{logDate.date.toString().slice(0, 15)}</h3>
          </div>
          {#if logDate.statusOfDay === 'day off'}
            <p>Day off</p>
          {:else if logDate.statusOfDay === 'working from home'}
            <div><p>Working from home</p></div>
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
          {/if}
        </div>
        <CardButton on:click>Edit</CardButton>
      </div>
    {/each}
  </div>
</div>

<style>
  .card-container--outer {
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

  .card-container--inner {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }

  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .card-content {
    border: 1px solid #333;
    height: 100%;
    border-bottom: 0px;
    /* border-radius: 7px; */
    box-shadow: inset 1px 1px 1px #444, inset -1px -1px 1px #222;
  }
</style>
