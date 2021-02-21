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

  let selectedDate = new Date();
  let workingFromHome = false;
  let meansOfTransport = 'Car';
  let routeTripOne = routes[1];
  let routeTripTwo = '';
  let roundTrip = false;
  let durationTripOne = '00:00';
  let durationTripTwo = '00:00';
  let costs = '0,00';

  $: costsValid = checkCostsInput(costs);
  $: durationTripOneValid = checkDurationInput(durationTripOne);
  $: durationTripTwoValid = checkDurationInput(durationTripTwo);
  $: routeTripTwo = roundTrip ? reverseRoute(routeTripOne) : routeTripTwo;

  function updateSelectedDate(date) {
    selectedDate = date;
  }

  // FOR DEV
  $: console.log('Date: ', selectedDate);
  $: console.log('Working from home: ', workingFromHome);
  $: console.log('Means of transport: ', meansOfTransport);
  $: console.log('Route Trip One: ', routeTripOne);
  $: console.log('Route Trip Two: ', routeTripTwo);
  $: console.log('Roundtrip: ', roundTrip);
  $: console.log('Duration Trip One: ', durationTripOne);
  $: console.log('Duration Trip Two: ', durationTripTwo);
  $: console.log('Costs: ', costs);
</script>

<Modal on:cancel>
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
        value={roundTrip}
        label=" Round trip?"
        on:change={(event) => (roundTrip = event.target.checked)}
      />
      <Dropdown
        route={routeTripOne}
        {routes}
        on:change={(event) => (routeTripOne = event.target.value)}
      />
      <TimeInput
        duration={durationTripOne}
        valid={durationTripOneValid}
        validityMessage="Please write a duration in the format hh:mm"
        on:input={(event) => (durationTripOne = event.target.value)}
      />
      {#if !roundTrip}
        <Dropdown
          route={routeTripTwo}
          {routes}
          on:change={(event) => (routeTripTwo = event.target.value)}
        />
      {:else}
        <p>{routeTripTwo}</p>
      {/if}
      <TimeInput
        duration={durationTripTwo}
        valid={durationTripTwoValid}
        validityMessage="Please write a duration in the format hh:mm"
        on:input={(event) => (durationTripTwo = event.target.value)}
      />
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
