<script>
  import { createEventDispatcher } from 'svelte';
  import Checkbox from '../UI/Inputs/Checkbox.svelte';
  import DatePicker from '../UI/Inputs/DatePicker.svelte';
  import Dropdown from '../UI/Inputs/Dropdown.svelte';
  import Modal from '../UI/Modal/Modal.svelte';
  import TimeInput from '../UI/Inputs/TimeInput.svelte';
  import RadioButton from '../UI/Inputs/RadioButton.svelte';
  import { checkDurationInput } from '../helpers/validation';
  import { formatTimeInput, reverseRoute } from '../helpers/formatting';
  import { routes } from '../constants';
  import FormButton from '../UI/Buttons/FormButton.svelte';
  import logData from '../Store/logState';

  export let id = null;

  // Initial values for form
  let selectedDate = new Date();
  let statusOfDay = 'working at the office';
  let meansOfTransport = 'car';
  let routeTripOne = routes[1];
  let routeTripTwo = '';
  let roundTrip = false;
  let durationTripOne = '00:00';
  let durationTripTwo = '00:00';

  if (id) {
    const unsubscribe = logData.subscribe((days) => {
      const selectedDay = days.find((d) => d.id === id);
      selectedDate = selectedDay.date;
      statusOfDay = selectedDay.statusOfDay;
      if (selectedDay.statusOfDay === 'working at the office') {
        meansOfTransport = selectedDay.meansOfTransport;
        routeTripOne = selectedDay.roundTripOne;
        routeTripTwo = selectedDay.routeTripTwo;
        durationTripOne = '00:40';
        durationTripTwo = '00:35';
      }
    });

    unsubscribe();
  }

  const dispatch = createEventDispatcher();

  $: durationTripOneValid = checkDurationInput(durationTripOne);
  $: durationTripTwoValid = checkDurationInput(durationTripTwo);
  $: routeTripTwo = roundTrip ? reverseRoute(routeTripOne) : routeTripTwo;

  function cancel() {
    dispatch('cancel');
  }

  function submitForm() {
    const logDate = {
      date: selectedDate,
      statusOfDay,
      meansOfTransport,
      routeTripOne,
      routeTripTwo,
      durationTripOne: formatTimeInput(durationTripOne),
      durationTripTwo: formatTimeInput(durationTripTwo),
    };

    if (id) {
      logData.updateLogDate(id, logDate);
    } else {
      logData.addLogDate({
        ...logDate,
      });
    }

    dispatch('save');
  }

  function updateSelectedDate(date) {
    selectedDate = date;
  }
</script>

<Modal on:cancel>
  <form>
    <DatePicker {selectedDate} {updateSelectedDate} />
    <div class="radio-button__container">
      <RadioButton
        name="statusOfDay"
        value="working at the office"
        group={statusOfDay}
        on:change={(event) => (statusOfDay = event.target.value)}
      />
      <RadioButton
        name="statusOfDay"
        value="working from home"
        group={statusOfDay}
        on:change={(event) => (statusOfDay = event.target.value)}
      />
      <RadioButton
        name="statusOfDay"
        value="day off"
        group={statusOfDay}
        on:change={(event) => (statusOfDay = event.target.value)}
      />
    </div>
    {#if statusOfDay === 'working at the office'}
      <div class="radio-button__container">
        <RadioButton
          name="transport"
          value="car"
          group={meansOfTransport}
          on:change={(event) => (meansOfTransport = event.target.value)}
        />
        <RadioButton
          name="transport"
          value="public transport"
          group={meansOfTransport}
          on:change={(event) => (meansOfTransport = event.target.value)}
        />
      </div>
      <Checkbox
        value={roundTrip}
        label=" Round trip?"
        on:change={(event) => (roundTrip = event.target.checked)}
      />
      <div class="dropdown-input__container">
        <Dropdown
          route={routeTripOne}
          {routes}
          title="Trip One"
          on:change={(event) => (routeTripOne = event.target.value)}
        />
        <TimeInput
          duration={durationTripOne}
          valid={durationTripOneValid}
          validityMessage="Please write a duration in the format hh:mm"
          on:input={(event) => (durationTripOne = event.target.value)}
        />
      </div>
      <div class="dropdown-input__container">
        <Dropdown
          route={routeTripTwo}
          {routes}
          title="Trip Two"
          on:change={(event) => (routeTripTwo = event.target.value)}
        />
        <TimeInput
          duration={durationTripTwo}
          valid={durationTripTwoValid}
          validityMessage="Please write a duration in the format hh:mm"
          on:input={(event) => (durationTripTwo = event.target.value)}
        />
      </div>
    {/if}
  </form>
  <div class="button__container" slot="footer">
    <FormButton on:click={submitForm}>Save</FormButton>
    <FormButton on:click={cancel}>Cancel</FormButton>
  </div>
  <!-- {#if id}
    <FormButton on:click={deleteDay}>Delete</FormButton>
  {/if} -->
</Modal>

<style>
  form {
    width: 100%;
  }

  .radio-button__container {
    width: 100%;
    margin-top: 1rem;
  }

  .dropdown-input__container {
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: space-between;
  }

  .button__container {
    width: 100%;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
