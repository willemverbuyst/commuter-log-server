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
  import TableDropDown from '../Inputs/TableDropdown.svelte';
  import { routes } from '../../constants';
  import TableDropdown from '../Inputs/TableDropdown.svelte';

  export let logData;

  const dispatch = createEventDispatcher();

  let filteredLogData = logData;

  let routesFrom = ['no sorting', ...routes];
  let routeFrom = routesFrom[0];

  let routesTo = ['no sorting', ...routes];
  let routeTo = routesTo[0];

  let sortDatesOptions = ['no sorting', 'ascending', 'descending'];
  let sortDatesOption = sortDatesOptions[0];

  let sortTravelTimeOptions = ['no sorting', 'ascending', 'descending'];
  let sortTravelTimeOption = sortTravelTimeOptions[0];

  let weekNumbers = ['all', ...getWeekNumbers(filteredLogData)];
  let weekNumber = weekNumbers[0];

  let years = ['all', ...getYears(filteredLogData)];
  let year = years[0];

  let statuses = ['all', ...getStatuses(filteredLogData)];
  let status = statuses[0];

  function resetFilters() {
    weekNumber = 'all';
    year = 'all';
    status = 'all';
    filteredLogData = logData;
  }

  function updateData(event, dropdown) {
    switch (dropdown) {
      case 'routeFrom':
        routeFrom = event.target.value;
        filteredLogData = filteredLogData.filter((date) =>
          status === 'no sorting' ? date : date.routeTripFrom === routeFrom
        );
        break;
      case 'routeTo':
        routeTo = event.target.value;
        filteredLogData = filteredLogData.filter((date) =>
          status === 'no sorting' ? date : date.routeTripTo === routeTo
        );
        break;
      case 'sortDate':
        sortDatesOption = event.target.value;
        filteredLogData =
          sortDatesOption === 'ascending'
            ? [...filteredLogData].sort(
                (a, b) => new Date(a.date) - new Date(b.date)
              )
            : [...filteredLogData].sort(
                (a, b) => new Date(b.date) - new Date(a.date)
              );
        break;
      case 'sortTravelTime':
        sortTravelTimeOption = event.target.value;
        filteredLogData =
          sortTravelTimeOption === 'ascending'
            ? filteredLogData
                .map((date) =>
                  date.statusOfDay !== 'working at the office'
                    ? { ...date, durationTrip: 0 }
                    : date
                )
                .sort((a, b) => a.durationTrip - b.durationTrip)
            : filteredLogData
                .map((date) =>
                  date.statusOfDay !== 'working at the office'
                    ? { ...date, durationTrip: 0 }
                    : date
                )
                .sort((a, b) => b.durationTrip - a.durationTrip);
        break;
      case 'status':
        status = event.target.value;
        filteredLogData = filteredLogData.filter((date) =>
          status === 'all' ? date : date.statusOfDay === status
        );
        break;
      case 'week':
        weekNumber = event.target.value;
        filteredLogData = filteredLogData.filter((date) =>
          weekNumber === 'all'
            ? date
            : Number(date.weekNumber) === Number(weekNumber)
        );
        break;
      case 'year':
        year = event.target.value;
        filteredLogData = filteredLogData.filter((date) =>
          year === 'all' ? date : Number(getYear(date.date)) === Number(year)
        );
        break;
      default:
        resetFilters();
    }
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
            options={years}
            value={year}
            on:change={(event) => updateData(event, 'year')}
          />
        </th>
        <th>
          <TableDropdown
            label="Week#"
            options={weekNumbers}
            value={weekNumber}
            on:change={(event) => updateData(event, 'week')}
          />
        </th>
        <th>
          <TableDropdown
            label="Date"
            options={sortDatesOptions}
            value={sortDatesOption}
            on:change={(event) => updateData(event, 'sortDate')}
          />
        </th>
        <th>
          <TableDropdown
            label="Working"
            options={statuses}
            value={status}
            on:change={(event) => updateData(event, 'status')}
          />
        </th>
        <th>
          <TableDropdown
            label="From"
            options={routesFrom}
            value={routeFrom}
            on:change={(event) => updateData(event, 'routeFrom')}
          />
        </th>
        <th>
          <TableDropdown
            label="To"
            options={routesTo}
            value={routeTo}
            on:change={(event) => updateData(event, 'routeTo')}
          />
        </th>
        <th>
          <TableDropdown
            label="Travel Time"
            options={sortTravelTimeOptions}
            value={sortTravelTimeOption}
            on:change={(event) => updateData(event, 'sortTravelTime')}
          />
        </th>
        <th />
      </tr>
      {#each filteredLogData as logDate}
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
