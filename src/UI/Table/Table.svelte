<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { formatDuration } from '../../Helpers/formatting';
  import { getDay, getYear } from '../../Helpers/dateLogic';
  import TableButton from '../Buttons/TableButton.svelte';
  import TableHeader from './TableHeader.svelte';
  import type { LogDate } from '../../models/Logdata';

  export let logData: LogDate[];

  const dispatch = createEventDispatcher();

  let filteredLogData = logData;

  function doUpdate(data: LogDate[]): void {
    filteredLogData = data;
  }
</script>

<div class="dashboard__container margin-bottom">
  <div class="table__container">
    <table>
      <TableHeader {doUpdate} {filteredLogData} {logData} />
      {#each filteredLogData as logDate}
        <tr>
          <td>{getYear(new Date(logDate.date))}</td>
          <td>{logDate.weekNumber}</td>
          <td class="tc--align-right">{getDay(new Date(logDate.date))}</td>
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
            {#if logDate.durationTrip}
              <td class="tc--align-right"
                >{formatDuration(logDate.durationTrip)}</td
              >
            {:else}
              <td />
            {/if}
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
    color: var(--main-txt-color);
  }

  table {
    margin: auto;
    border-spacing: collapse;
  }

  td {
    padding: 0.8rem 2rem;
    text-align: left;
    border: 2px solid var(--main-bg-color);
    box-shadow: inset 0.5px 0.5px 0.5px var(--main-bg-color-light),
      inset -0.5px -0.5px 0.5px var(--main-bg-color-dark);
  }

  .tc--align-right {
    text-align: right;
  }

  .margin-bottom {
    margin-bottom: 2rem;
  }
</style>
