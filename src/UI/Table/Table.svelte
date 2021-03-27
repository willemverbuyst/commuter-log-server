<script>
  import { createEventDispatcher } from 'svelte';
  import { formatDuration } from '../../Helpers/formatting';
  import {
    getWeekNumbers,
    getStatuses,
    getYears,
  } from '../../Helpers/logDataLogic';
  import { getDay, getYear } from '../../Helpers/utils';
  import TableButton from '../Buttons/TableButton.svelte';

  export let logData;

  const dispatch = createEventDispatcher();

  const weekNumbers = ['all', ...getWeekNumbers(logData)];
  let weekNumber = weekNumbers[0];

  const years = ['all', ...getYears(logData)];
  let year = years[0];

  const statuses = ['all', ...getStatuses(logData)];
  let status = statuses[0];

  let filteredLogData = logData.filter((date) =>
    weekNumber === 'all' ? date : date.weekNumber === weekNumber
  );

  function updateData(event, dropdown) {
    switch (dropdown) {
      case 'week':
        weekNumber = event.target.value;
        year = 'all';
        status = 'all';
        filteredLogData = logData.filter((date) =>
          weekNumber === 'all'
            ? date
            : Number(date.weekNumber) === Number(weekNumber)
        );
        break;
      case 'year':
        year = event.target.value;
        weekNumber = 'all';
        status = 'all';
        filteredLogData = logData.filter((date) =>
          year === 'all' ? date : Number(getYear(date.date)) === Number(year)
        );
        break;
      case 'status':
        status = event.target.value;
        weekNumber = 'all';
        year = 'all';
        filteredLogData = logData.filter((date) =>
          status === 'all' ? date : date.statusOfDay === status
        );
        break;
    }
  }
</script>

<div class="dashboard__container margin-bottom">
  <div class="table__container">
    <table>
      <tr>
        <th>
          <div class="trip-input__container">
            <div class="trip-input__label">Year</div>
            <!-- svelte-ignore a11y-no-onchange -->
            <select
              value={year}
              on:change={(event) => updateData(event, 'year')}
            >
              {#each years as y}
                <option value={y}>{y}</option>
              {/each}
            </select>
          </div></th
        >
        <th>
          <div class="trip-input__container">
            <div class="trip-input__label">Week#</div>
            <!-- svelte-ignore a11y-no-onchange -->
            <select
              value={weekNumber}
              on:change={(event) => updateData(event, 'week')}
            >
              {#each weekNumbers as w}
                <option value={w}>{w}</option>
              {/each}
            </select>
          </div></th
        >
        <th class="tc--align-right">Date</th>
        <th>
          <div class="trip-input__container">
            <div class="trip-input__label">Work</div>
            <!-- svelte-ignore a11y-no-onchange -->
            <select
              value={status}
              on:change={(event) => updateData(event, 'status')}
            >
              {#each statuses as s}
                <option value={s}>{s}</option>
              {/each}
            </select>
          </div></th
        >
        <th>From</th>
        <th>To</th>
        <th class="tc--align-right">Travel Time</th>
        <th />
      </tr>
      {#each filteredLogData as logDate}
        <td>{getYear(logDate.date)}</td>
        <td>{logDate.weekNumber}</td>
        <td class="tc--align-right">{getDay(logDate.date)}</td>
        {#if logDate.statusOfDay === 'day off'}
          <td colspan="4" class="tc--day-off">Day off</td>
          <TableButton on:click={() => dispatch('edit', logDate.id)}
            >Edit</TableButton
          >
        {:else if logDate.statusOfDay === 'working from home'}
          <td colspan="4">Working from home</td>
          <TableButton on:click={() => dispatch('edit', logDate.id)}
            >Edit</TableButton
          >
        {:else}
          <td>{logDate.meansOfTransport}</td>
          <td>{logDate.routeTripFrom}</td>
          <td>{logDate.routeTripTo}</td>
          <td class="tc--align-right">{formatDuration(logDate.durationTrip)}</td
          >
          <TableButton on:click={() => dispatch('edit', logDate.id)}
            >Edit</TableButton
          >
        {/if}
        <tr />{/each}
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

  .tc--align-right {
    text-align: right;
  }

  .margin-bottom {
    margin-bottom: 2rem;
  }
</style>
