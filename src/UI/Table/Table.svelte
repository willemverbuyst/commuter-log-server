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
  <table>
    <tr>
      <th>Date</th>
      <th>Work</th>
      <th>Trip One</th>
      <th>Trip Two</th>
      <th class="tc--align-right">Total Travel Time</th>
      <th />
    </tr>
    {#each logDates as logDate}
      <td>{logDate.date.toString().slice(0, 15)}</td>
      {#if logDate.holiday}
        <td colspan="4" class="tc--day-off">Day off</td>
        <Button on:click>Edit</Button>
        <!-- <td class="tc--edit" on:click>Edit</td> -->
      {:else if logDate.workingFromHome}
        <td colspan="4">Working from home</td>
        <Button on:click>Edit</Button>
        <!-- <td class="tc--edit" on:click>Edit</td> -->
      {:else}
        <td>{logDate.meansOfTransport}</td>
        <td>{logDate.routeTripOne}</td>
        <td>{logDate.routeTripTwo}</td>
        <td class="tc--align-right"
          >{formatDuration(
            logDate.durationTripOne + logDate.durationTripTwo
          )}</td
        >
        <Button on:click>Edit</Button>

        <!-- <td class="tc--edit" on:click>Edit</td> -->
      {/if}
      <tr />{/each}
  </table>
</div>

<style>
  table {
    margin: auto;
    border-spacing: collapse;
  }

  th {
    /* text-transform: uppercase; */
    color: rgba(170, 170, 170, 0.3);
  }

  th,
  td {
    padding: 0.8rem 2rem;
    text-align: left;
  }

  td {
    border: 2px solid #333;
    /* border-radius: 7px; */
    box-shadow: inset 0.5px 0.5px 0.5px #444, inset -0.5px -0.5px 0.5px #222;
  }

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

  .tc--align-right {
    text-align: right;
  }

  /* .tc--edit {
    padding: 0.4rem 1rem;
    border-radius: 7px;
    box-shadow: inset 1px 1px 1px #444, inset -1px -1px 1px #222;
  } */

  /* .tc--align-center {
    text-align: center;
  } */
</style>
