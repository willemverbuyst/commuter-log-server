<script>
  import { formatDuration } from '../../Helpers/formatting';
  import TableButton from '../Buttons/TableButton.svelte';

  export let logData;
</script>

<div class="table-container">
  <table>
    <tr>
      <th>Date</th>
      <th>Work</th>
      <th>Trip One</th>
      <th>Trip Two</th>
      <th class="tc--align-right">Total Travel Time</th>
      <th />
    </tr>
    {#each logData as logDate}
      <td>{logDate.date.toString().slice(0, 15)}</td>
      {#if logDate.statusOfDay === 'day off'}
        <td colspan="4" class="tc--day-off">Day off</td>
        <TableButton on:click>Edit</TableButton>
      {:else if logDate.statusOfDay === 'working from home'}
        <td colspan="4">Working from home</td>
        <TableButton on:click>Edit</TableButton>
      {:else}
        <td>{logDate.meansOfTransport}</td>
        <td>{logDate.routeTripOne}</td>
        <td>{logDate.routeTripTwo}</td>
        <td class="tc--align-right"
          >{formatDuration(
            logDate.durationTripOne + logDate.durationTripTwo
          )}</td
        >
        <TableButton on:click>Edit</TableButton>
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
    color: rgba(170, 170, 170, 0.3);
  }

  th,
  td {
    padding: 0.8rem 2rem;
    text-align: left;
  }

  td {
    border: 2px solid #333;
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

  .tc--align-right {
    text-align: right;
  }
</style>
