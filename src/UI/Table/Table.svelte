<script>
  import { getWeekNumber } from '../../Helpers/chartLogic/chartLogic';
  import { formatDuration } from '../../Helpers/formatting';

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
      <th>Total Travel Time</th>
    </tr>
    {#each logDates as logDate}
      <tr>
        <td>{logDate.date.toString().slice(0, 15)}</td>
        <td>{logDate.meansOfTransport}</td>
        <td>{logDate.routeTripOne}</td>
        <td>{logDate.routeTripTwo}</td>
        <td
          >{formatDuration(
            logDate.durationTripOne + logDate.durationTripTwo
          )}</td
        >
      </tr>
    {/each}
  </table>
</div>

<style>
  table {
    margin: auto;
  }

  th {
    text-transform: uppercase;
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
</style>
