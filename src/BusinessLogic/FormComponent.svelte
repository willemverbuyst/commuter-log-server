<script>
  import Checkbox from '../UI/Checkbox.svelte';
  import DatePicker from '../UI/DatePicker.svelte';
  import Dropdown from '../UI/Dropdown.svelte';
  import Modal from '../UI/Modal.svelte';
  import TimeInput from '../UI/TimeInput.svelte';
  import RadioButton from '../UI/RadioButton.svelte';
  import CostsInput from '../UI/CostsInput.svelte';
  import { checkCostsInput, checkDurationInput } from '../helpers/validation';
  import { reverseRoute } from '../helpers/formatting';
  import { routes } from '../constants';

  let costs = '0,00';
  let selectedDate = new Date();
  let workingFromHome = false;
  let meansOfTransport = 'Car';
  let returnTrip = false;
  let route = routes[1];
  // let routeBack = routes[3];
  let duration = '00:00';

  $: durationValid = checkDurationInput(duration);
  $: costsValid = checkCostsInput(costs);

  function updateSelectedDate(date) {
    selectedDate = date;
  }

  // $: console.log('Date: ', selectedDate);
  // $: console.log('Working from home: ', workingFromHome);
  // $: console.log('Return: ', returnTrip);
  // $: console.log('Means of transport: ', meansOfTransport);
  // $: console.log('Route: ', route);
  // $: console.log('Route back: ', routeBack);
  // $: console.log('Costs: ', costs);
</script>

<Modal title="Add a day to log" on:cancel>
  <form>
    <DatePicker {selectedDate} {updateSelectedDate} />
    <Checkbox
      value={workingFromHome}
      label="Working from home?"
      on:change={(event) => (workingFromHome = event.target.checked)}
    />
    {#if !workingFromHome}
      <div>
        <RadioButton
          name="transport"
          value="Car"
          group={meansOfTransport}
          on:change={(event) => (meansOfTransport = event.target.value)}
        />
        <RadioButton
          name="transport"
          value="Public Transport"
          group={meansOfTransport}
          on:change={(event) => (meansOfTransport = event.target.value)}
        />
      </div>
      <Checkbox
        value={returnTrip}
        label=" Return trip?"
        on:change={(event) => (returnTrip = event.target.checked)}
      />
      <Dropdown
        {route}
        {routes}
        label="One Way"
        on:change={(event) => (route = event.target.value)}
      />
      <TimeInput
        {duration}
        valid={durationValid}
        validityMessage="Please write a duration in the format hh:mm"
        on:input={(event) => (duration = event.target.value)}
      />
      {#if returnTrip}
        <p>{reverseRoute(route)}</p>
      {/if}
      <CostsInput
        {costs}
        valid={costsValid}
        validityMessage="Please write costs in the format 0,00"
        on:input={(event) => (costs = event.target.value)}
      />
    {/if}
  </form>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>
