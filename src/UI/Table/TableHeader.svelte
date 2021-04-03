<script lang="ts">
  import { routes } from '../../constants';
  import TableButton from '../Buttons/TableButton.svelte';
  import TableDropdown from '../Inputs/TableDropdown.svelte';
  import {
    getWeekNumbers,
    getStatuses,
    getYears,
  } from '../../Helpers/logDataLogic';
  import { filterData } from '../../Helpers/tableLogic/filter';
  import type { LogDate } from '../../models/Logdata';

  export let logData: LogDate[];
  export let filteredLogData: LogDate[];
  export let doUpdate: (logData: LogDate[]) => void;

  let filters = {
    routesFrom: ['no sorting', ...routes],
    routeFrom: 'no sorting',
    routesTo: ['no sorting', ...routes],
    routeTo: 'no sorting',
    sortDates: ['no sorting', 'ascending', 'descending'],
    sortDate: 'no sorting',
    sortTravelTimes: ['no sorting', 'ascending', 'descending'],
    sortTravelTime: 'no sorting',
    statuses: ['all', ...getStatuses(filteredLogData)],
    status: 'all',
    weeks: ['all', ...getWeekNumbers(filteredLogData)],
    week: 'all',
    years: ['all', ...getYears(filteredLogData)],
    year: 'all',
  };

  function resetFilters(): void {
    filters.routeFrom = 'no sorting';
    filters.routeTo = 'no sorting';
    filters.sortDate = 'no sorting';
    filters.sortTravelTime = 'no sorting';
    filters.status = 'all';
    filters.week = 'all';
    filters.year = 'all';

    doUpdate(logData);
  }

  function updateData(
    event: any,
    dropdown:
      | 'routeFrom'
      | 'routeTo'
      | 'sortDate'
      | 'sortTravelTime'
      | 'status'
      | 'week'
      | 'year'
  ): void {
    filters[dropdown] = event.target.value;
    filteredLogData = filterData(filteredLogData, filters[dropdown], dropdown);

    doUpdate(filteredLogData);
  }
</script>

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
      options={filters.weeks.map((w) => String(w))}
      value={filters.week}
      on:change={(event) => updateData(event, 'week')}
    />
  </th>
  <th>
    <TableDropdown
      label="Date"
      options={filters.sortDates}
      value={filters.sortDate}
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
      options={filters.sortTravelTimes}
      value={filters.sortTravelTime}
      on:change={(event) => updateData(event, 'sortTravelTime')}
    />
  </th>
  <th>
    <div class="label">Filters</div>
    <TableButton on:click={resetFilters}>Reset</TableButton></th
  >
</tr>

<style>
  th {
    text-align: center;
  }

  .label {
    margin-bottom: 10px;
    text-transform: uppercase;
  }
</style>
