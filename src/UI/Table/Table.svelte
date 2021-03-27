<script>
  import { createEventDispatcher } from 'svelte';
  import { formatDuration } from '../../Helpers/formatting';
  import { getDay, getYear } from '../../Helpers/utils';
  import TableButton from '../Buttons/TableButton.svelte';
  import TableHeader from './TableHeader.svelte';

  export let logData;

  const dispatch = createEventDispatcher();

  let filteredLogData = logData;

  function doUpdate(data) {
    filteredLogData = data;
  }
</script>

<div class="dashboard__container margin-bottom">
  <div class="table__container">
    <table>
      <TableHeader {doUpdate} {filteredLogData} {logData} />
      {#each filteredLogData as logDate}
        <tr>
          <td>{getYear(logDate.date)}</td>
          <td>{logDate.weekNumber}</td>
          <td class="tc--align-right">{getDay(logDate.date)}</td>
          {#if logDate.statusOfDay === 'day off'}
            <td colspan="4" class="tc--day-off">day off</td>
            <TableButton on:click={() => dispatch('edit', logDate.id)}
              >Edit</TableButton
            >
          {:else if logDate.statusOfDay === 'working from home'}
            <td colspan="4">working from home</td>
            <TableButton on:click={() => dispatch('edit', logDate.id)}
              >Edit</TableButton
            >
          {:else}
            <td>{logDate.meansOfTransport}</td>
            <td>{logDate.routeTripFrom}</td>
            <td>{logDate.routeTripTo}</td>
            <td class="tc--align-right"
              >{formatDuration(logDate.durationTrip)}</td
            >
            <TableButton on:click={() => dispatch('edit', logDate.id)}
              >Edit</TableButton
            >
          {/if}
        </tr>
      {/each}
    </table>
  </div>
</div>

<style>
  .table__container {
    width: 1150px;
    font-family: 'Helvetica Neue';
    font-size: 12px;
    line-height: 1.2;
    color: #aaa;
  }

  table {
    margin: auto;
    border-spacing: collapse;
  }

  td {
    padding: 0.8rem 2rem;
    text-align: left;
    border: 2px solid #333;
    box-shadow: inset 0.5px 0.5px 0.5px #444, inset -0.5px -0.5px 0.5px #222;
  }

  .tc--align-right {
    text-align: right;
  }

  .margin-bottom {
    margin-bottom: 2rem;
  }
</style>
