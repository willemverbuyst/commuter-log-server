<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import DatePicker from '../UI/Inputs/DatePicker.svelte';
  import FormDropdown from '../UI/Inputs/FormDropdown.svelte';
  import Modal from '../UI/Modal/Modal.svelte';
  import TimeInput from '../UI/Inputs/TimeInput.svelte';
  import RadioButton from '../UI/Inputs/RadioButton.svelte';
  import { formatDuration, formatTimeInput } from '../Helpers/formatting';
  import { checkDurationInput } from '../Helpers/validation';
  import { getWeekNumber } from '../Helpers/logDataLogic';
  import { routes } from '../constants';
  import FormButton from '../UI/Buttons/FormButton.svelte';
  import logData from '../Store/logState';
  import type {
    LogDate,
    MeansOfTransport,
    StatusOfDay,
  } from '../models/Logdata';

  export let id: string | undefined;

  // Initial values for form
  let selectedDate: Date = new Date();
  let statusOfDay: StatusOfDay = 'working at the office';
  let meansOfTransport: MeansOfTransport = 'car';
  let routeTripFrom: string = routes[1];
  let routeTripTo: string = routes[2];
  let durationTrip: string = '00:00';

  if (id) {
    const unsubscribe = logData.subscribe((days) => {
      const selectedDay: LogDate | undefined = days.find(
        (d: LogDate) => d.id === id
      );
      if (selectedDay) {
        selectedDate = selectedDay.date;
        statusOfDay = selectedDay.statusOfDay;
        if (selectedDay.statusOfDay === 'working at the office') {
          meansOfTransport = selectedDay.meansOfTransport;
          routeTripFrom = selectedDay.routeTripFrom;
          routeTripTo = selectedDay.routeTripTo;
          durationTrip = formatDuration(selectedDay.durationTrip);
        } else {
          meansOfTransport = '';
          routeTripFrom = '';
          routeTripTo = '';
          durationTrip = '00:00';
        }
      }
    });

    unsubscribe();
  }

  const dispatch = createEventDispatcher();

  $: durationTripValid = checkDurationInput(durationTrip);

  function cancel() {
    dispatch('cancel');
  }

  function submitForm() {
    console.log(getWeekNumber(selectedDate));
    const logDate: LogDate = {
      date: selectedDate,
      statusOfDay,
      meansOfTransport,
      routeTripFrom,
      routeTripTo,
      durationTrip: formatTimeInput(durationTrip),
      weekNumber: getWeekNumber(selectedDate)[1],
    };

    if (id) {
      //  @ts-ignore
      fetch(`${__myapp.env.DATABASE}/logData/${id}.json`, {
        method: 'PATCH',
        body: JSON.stringify(logDate),
        headers: { 'Content-Type': 'application-json' },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('An error occured, please try again!');
          }
          if (id) logData.updateLogDate(id, logDate);
        })
        .catch((err) => console.log(err));

      dispatch('save');
    } else {
      //  @ts-ignore
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

  function updateSelectedDate(date: Date) {
    date.setHours(date.getHours() + 1);
    selectedDate = date;
  }
</script>

<Modal on:cancel>
  <h1>Add a day to log</h1>
  <form>
    <DatePicker {selectedDate} {updateSelectedDate} />
    <div class="radio-button__container">
      <RadioButton
        name="statusOfDay"
        group={statusOfDay}
        bind:value={statusOfDay}
      />
      <RadioButton
        name="statusOfDay"
        group={statusOfDay}
        bind:value={statusOfDay}
      />
      <RadioButton
        name="statusOfDay"
        group={statusOfDay}
        bind:value={statusOfDay}
      />
    </div>
    {#if statusOfDay === 'working at the office'}
      <div class="radio-button__container">
        <RadioButton
          name="transport"
          group={meansOfTransport}
          bind:value={meansOfTransport}
        />
        <RadioButton
          name="transport"
          group={meansOfTransport}
          bind:value={meansOfTransport}
        />
      </div>

      <div class="dropdown-input__container">
        <FormDropdown {routes} title="To" bind:value={routeTripFrom} />
        <FormDropdown {routes} title="From" bind:value={routeTripTo} />
        <TimeInput
          valid={durationTripValid}
          validityMessage="Please write a duration in the format hh:mm"
          bind:value={durationTrip}
        />
      </div>
    {/if}
  </form>
  <div class="button__container" slot="footer">
    <FormButton on:click={submitForm}>Save</FormButton>
    <FormButton on:click={cancel}>Cancel</FormButton>
  </div>
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
