<script>
  import { createEventDispatcher } from 'svelte';
  import { formatDuration } from '../../Helpers/formatting';
  import {
    getWeekNumbers,
    getStatuses,
    getYears,
  } from '../../Helpers/logDataLogic';
  import { getDay, getYear } from '../../Helpers/utils';
  import { filterData } from '../../Helpers/tableLogic/filter';
  import TableButton from '../Buttons/TableButton.svelte';
  import TableDropDown from '../Inputs/TableDropdown.svelte';
  import { routes } from '../../constants';
  import TableDropdown from '../Inputs/TableDropdown.svelte';

  export let logData;

  const dispatch = createEventDispatcher();

  let filteredLogData = logData;

  let filters = {
    routesFrom: ['no sorting', ...routes],
    routeFrom: 'no sorting',
    routesTo: ['no sorting', ...routes],
    routeTo: 'no sorting',
    sortDatesOptions: ['no sorting', 'ascending', 'descending'],
    sortDatesOption: 'no sorting',
    sortTravelTimeOptions: ['no sorting', 'ascending', 'descending'],
    sortTravelTimeOption: 'no sorting',
    statuses: ['all', ...getStatuses(filteredLogData)],
    status: 'all',
    weeks: ['all', ...getWeekNumbers(filteredLogData)],
    week: 'all',
    years: ['all', ...getYears(filteredLogData)],
    year: 'all',
  };

  function resetFilters() {
    filters.routeFrom = 'no sorting';
    filters.routeTo = 'no sorting';
    filters.sortDatesOption = 'no sorting';
    filters.sortTravelTimeOption = 'no sorting';
    filters.status = 'all';
    filters.week = 'all';
    filters.year = 'all';
    filteredLogData = logData;
  }

  function updateData(event, dropdown) {
    filters[dropdown] = event.target.value;
    filteredLogData = filterData(filteredLogData, filters[dropdown], dropdown);
  }
</script>

<div class="dashboard__container margin-bottom">
  <div id="reset-btn">
    <TableButton on:click={resetFilters}>Reset Filters</TableButton>
  </div>
  <div class="table__container">
    <table>
      <tr>
        <th>
          <TableDropdown
            label="year"
            options={filters.years}
            value={filters.year}
            on:change={(event) => updateData(event, 'year')}
          />
        </th>
        <th>
          <TableDropdown
            label="Week#"
            options={filters.weeks}
            value={filters.week}
            on:change={(event) => updateData(event, 'week')}
          />
        </th>
        <th>
          <TableDropdown
            label="Date"
            options={filters.sortDatesOptions}
            value={filters.sortDatesOption}
            on:change={(event) => updateData(event, 'sortDate')}
          />
        </th>
        <th>
          <TableDropdown
            label="Working"
            options={filters.statuses}
            value={filters.status}
            on:change={(event) => updateData(event, 'status')}
          />
        </th>
        <th>
          <TableDropdown
            label="From"
            options={filters.routesFrom}
            value={filters.routeFrom}
            on:change={(event) => updateData(event, 'routeFrom')}
          />
        </th>
        <th>
          <TableDropdown
            label="To"
            options={filters.routesTo}
            value={filters.routeTo}
            on:change={(event) => updateData(event, 'routeTo')}
          />
        </th>
        <th>
          <TableDropdown
            label="Travel Time"
            options={filters.sortTravelTimeOptions}
            value={filters.sortTravelTimeOption}
            on:change={(event) => updateData(event, 'sortTravelTime')}
          />
        </th>
      </tr>
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
  #reset-btn {
    margin-bottom: 0.5rem;
  }

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
    text-align: center;
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
