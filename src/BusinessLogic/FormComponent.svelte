<script>
  import { createEventDispatcher } from 'svelte';
  // import Checkbox from '../UI/Inputs/Checkbox.svelte';
  import DatePicker from '../UI/Inputs/DatePicker.svelte';
  import Dropdown from '../UI/Inputs/Dropdown.svelte';
  import Modal from '../UI/Modal/Modal.svelte';
  import TimeInput from '../UI/Inputs/TimeInput.svelte';
  import RadioButton from '../UI/Inputs/RadioButton.svelte';
  import { checkDurationInput } from '../helpers/validation';
  import { formatTimeInput } from '../helpers/formatting';
  import { routes } from '../constants';
  import FormButton from '../UI/Buttons/FormButton.svelte';
  import logData from '../Store/logState';
  import { formatDuration } from '../Helpers/formatting';

  export let id = null;

  // Initial values for form
  let selectedDate = new Date();
  let statusOfDay = 'working at the office';
  let meansOfTransport = 'car';
  let routeTripFrom = routes[1];
  let routeTripTo = routes[2];
  // let routeTripTwoFrom = routes[1];
  // let routeTripTwoTo = routes[2];
  // let roundTrip = false;
  let durationTrip = '00:00';
  // let durationTripTwo = '00:00';

  if (id) {
    const unsubscribe = logData.subscribe((days) => {
      const selectedDay = days.find((d) => d.id === id);
      selectedDate = selectedDay.date;
      statusOfDay = selectedDay.statusOfDay;
      if (selectedDay.statusOfDay === 'working at the office') {
        meansOfTransport = selectedDay.meansOfTransport;
        routeTripFrom = selectedDay.roundTripFrom;
        routeTripTo = selectedDay.roundTripTo;
        // routeTripTwoFrom = selectedDay.routeTripTwoFrom;
        // routeTripTwoTo = selectedDay.routeTripTwoTo;
        durationTrip = formatDuration(selectedDay.durationTrip);
        // durationTripTwo = formatDuration(selectedDay.durationTripTwo);
      }
    });

    unsubscribe();
  }

  const dispatch = createEventDispatcher();

  $: durationTripValid = checkDurationInput(durationTrip);
  // $: durationTripTwoValid = checkDurationInput(durationTripTwo);
  // $: routeTripTwo = roundTrip ? reverseRoute(routeTripOne) : routeTripTwo;

  function cancel() {
    dispatch('cancel');
  }

  function submitForm() {
    const logDate =
      statusOfDay === 'working at the office'
        ? {
            date: selectedDate,
            statusOfDay,
            meansOfTransport,
            routeTripFrom,
            routeTripTo,
            // routeTripTwoFrom,
            // routeTripTwoTo,
            durationTrip: formatTimeInput(durationTrip),
            // durationTripTwo: formatTimeInput(durationTripTwo),
          }
        : {
            date: selectedDate,
            statusOfDay,
          };

    if (id) {
      fetch(`${__myapp.env.DATABASE}/logData/${id}.json`, {
        method: 'PATCH',
        body: JSON.stringify(logDate),
        headers: { 'Content-Type': 'application-json' },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('An error occured, please try again!');
          }
          logData.updateLogDate(id, logDate);
        })
        .catch((err) => console.log(err));

      dispatch('save');
    } else {
      fetch(`${__myapp.env.DATABASE}/logdata.json`, {
        method: 'POST',
        body: JSON.stringify(logDate),
        headers: { 'Content-Type': 'application-json' },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('An error occured, please try again!');
          }
          return res.json();
        })
        .then((data) => {
          logData.addLogDate({
            ...logDate,
            id: data.name,
          });
        })
        .catch((err) => console.log(err));

      dispatch('save');
    }
  }
  // if (id) {
  //   logData.updateLogDate(id, logDate);
  // } else {
  //   logData.addLogDate({
  //     ...logDate,
  //     id: 'xxxx',
  //   });
  // }

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

      <div class="dropdown-input__container">
        <Dropdown
          route={routeTripFrom}
          {routes}
          title="To"
          on:change={(event) => (routeTripFrom = event.target.value)}
        />
        <Dropdown
          route={routeTripTo}
          {routes}
          title="From"
          on:change={(event) => (routeTripTo = event.target.value)}
        />
        <TimeInput
          duration={durationTrip}
          valid={durationTripValid}
          validityMessage="Please write a duration in the format hh:mm"
          on:input={(event) => (durationTrip = event.target.value)}
        />
      </div>
      <!-- <Checkbox
        value={roundTrip}
        label=" Round trip?"
        on:change={(event) => (roundTrip = event.target.checked)}
      />
      <div class="dropdown-input__container">
        <Dropdown
          route={routeTripTwoFrom}
          {routes}
          title="Trip Two"
          on:change={(event) => (routeTripTwoFrom = event.target.value)}
        />
        <Dropdown
          route={routeTripTwoTo}
          {routes}
          title="Trip Two"
          on:change={(event) => (routeTripTwoTo = event.target.value)}
        />
        <TimeInput
          duration={durationTripTwo}
          valid={durationTripTwoValid}
          validityMessage="Please write a duration in the format hh:mm"
          on:input={(event) => (durationTripTwo = event.target.value)}
        />
      </div> -->
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
