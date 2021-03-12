<script>
  import Checkbox from '../UI/Inputs/Checkbox.svelte';
  import DatePicker from '../UI/Inputs/DatePicker.svelte';
  import Dropdown from '../UI/Inputs/Dropdown.svelte';
  import Modal from '../UI/Modal/Modal.svelte';
  import TimeInput from '../UI/Inputs/TimeInput.svelte';
  import RadioButton from '../UI/Inputs/RadioButton.svelte';
  import { checkDurationInput } from '../helpers/validation';
  import { reverseRoute } from '../helpers/formatting';
  import { routes } from '../constants';

  let selectedDate = new Date();
  let day = 'Working at the Office';
  let meansOfTransport = 'Car';
  let routeTripOne = routes[1];
  let routeTripTwo = '';
  let roundTrip = false;
  let durationTripOne = '00:00';
  let durationTripTwo = '00:00';
  let costs = '0,00';

  $: durationTripOneValid = checkDurationInput(durationTripOne);
  $: durationTripTwoValid = checkDurationInput(durationTripTwo);
  $: routeTripTwo = roundTrip ? reverseRoute(routeTripOne) : routeTripTwo;

  function updateSelectedDate(date) {
    selectedDate = date;
  }

  // FOR DEV
  $: console.log('Date: ', selectedDate);
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
    <div class="radio-button__container">
      <RadioButton
        name="day"
        value="Working at the Office"
        group={day}
        on:change={(event) => (day = event.target.value)}
      />
      <RadioButton
        name="day"
        value="Working at Home"
        group={day}
        on:change={(event) => (day = event.target.value)}
      />
      <RadioButton
        name="day"
        value="Day off"
        group={day}
        on:change={(event) => (day = event.target.value)}
      />
    </div>
    {#if day === 'Working at the Office'}
      <div class="radio-button__container">
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
      <div class="trip-container">
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
      </div>
      <div class="trip-container">
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
      </div>
    {/if}
  </form>
</Modal>

<style>
  form {
    width: 100%;
  }

  .radio-button__container {
    margin-top: 1rem;
  }

  .trip-container {
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: center;
  }
</style>
