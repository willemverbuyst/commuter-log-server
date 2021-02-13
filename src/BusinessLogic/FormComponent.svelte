<script>
  import Checkbox from '../UI/Checkbox.svelte';
  import DatePicker from '../UI/DatePicker.svelte';
  import Dropdown from '../UI/Dropdown.svelte';
  import TextInput from '../UI/TextInput.svelte';
  import RadioButton from '../UI/RadioButton.svelte';

  import { routes } from '../constants';

  let costs = '';
  let selectedDate = new Date();
  let workingFromHome = false;
  let meansOfTransport = 'Car';
  let returnTrip = false;
  let route = routes[1];
  let routeBack = routes[3];

  function updateSelectedDate(date) {
    selectedDate = date;
  }

  function updateRouteBack(event) {
    routeBack = event.target.value;
  }

  function updateCosts(event) {
    costs = event.target.value;
  }

  function updateRouteSelection(event) {
    route = event.target.value;
  }

  function updateMeansOfTransport(event) {
    meansOfTransport = event.target.value;
  }

  $: console.log('Date: ', selectedDate);
  $: console.log('Working from home: ', workingFromHome);
  $: console.log('Return: ', returnTrip);
  $: console.log('Means of transport: ', meansOfTransport);
  $: console.log('Route: ', route);
  $: console.log('Route back: ', routeBack);
  $: console.log('Costs: ', costs);
</script>

<form>
  <DatePicker {selectedDate} {updateSelectedDate} />
  <Checkbox
    value={workingFromHome}
    label="Working from home?"
    on:change={(event) => (workingFromHome = event.target.checked)}
  />

  <div>
    <RadioButton
      name="transport"
      value="Car"
      group={meansOfTransport}
      on:change={updateMeansOfTransport}
    />
    <RadioButton
      name="transport"
      value="Public Transport"
      group={meansOfTransport}
      on:change={updateMeansOfTransport}
    />
  </div>

  <Checkbox
    value={returnTrip}
    label=" Return trip?"
    on:change={(event) => (returnTrip = event.target.checked)}
  />
  <Dropdown {route} {routes} label="One Way" on:change={updateRouteSelection} />
  {#if returnTrip}
    <TextInput
      label="Route back"
      value={routeBack}
      on:input={updateRouteBack}
    />
  {/if}
  <TextInput label="Costs" value={costs} on:input={updateCosts} />
</form>

<style>
  form {
    width: 50vw;
    margin: auto;
  }
</style>
