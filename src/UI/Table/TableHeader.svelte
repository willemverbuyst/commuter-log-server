<script>
  import { routes } from '../../constants';
  import TableButton from '../Buttons/TableButton.svelte';
  import TableDropdown from '../Inputs/TableDropdown.svelte';
  import {
    getWeekNumbers,
    getStatuses,
    getYears,
  } from '../../Helpers/logDataLogic';
  import { filterData } from '../../Helpers/tableLogic/filter';

  export let logData;
  export let filteredLogData;
  export let doUpdate;

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

    doUpdate(logData);
  }

  function updateData(event, dropdown) {
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
