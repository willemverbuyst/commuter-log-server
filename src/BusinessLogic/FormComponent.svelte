<script>
  import Checkbox from '../UI/Checkbox.svelte';
  import InputComponent from '../UI/InputComponent.svelte';
  import Datepicker from 'svelte-calendar';
  import Dropdown from '../UI/Dropdown.svelte';

  import { routes } from '../constants';

  let costs = '';
  let minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
  let maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

  let selectedDate = new Date();
  let format = '#{l} #{j} #{M} #{Y}';
  let workingFromHome = false;
  let meansOfTransport = 'Car';
  let returnTrip = false;
  let route = routes[1];
  let routeBack = routes[3];

  function updateRouteBack(event) {
    routeBack = event.target.value;
  }

  function updateCosts(event) {
    costs = event.target.value;
  }

  function updateRouteSelection(event) {
    route = event.target.value;
  }

  $: console.log(selectedDate);
  $: console.log('Return: ', returnTrip);
  $: console.log(meansOfTransport);
  $: console.log('Route: ', route);
  $: console.log('Route back: ', routeBack);
  $: console.log('Costs: ', costs);
  $: console.log('Working from home: ', workingFromHome);
</script>

<form>
  <Datepicker
    {format}
    start={minDate}
    end={maxDate}
    bind:selected={selectedDate}
    buttonBackgroundColor="#e20074"
    buttonTextColor="white"
    highlightColor="#e20074"
    dayBackgroundColor="#efefef"
    dayTextColor="#333"
    dayHighlightedBackgroundColor="#e20074"
    dayHighlightedTextColor="#fff"
  />
  <Checkbox
    value={workingFromHome}
    label="Working from home?"
    on:change={(event) => (workingFromHome = event.target.checked)}
  />

  <div>
    <label>
      <input
        type="radio"
        name="transport"
        value="Car"
        bind:group={meansOfTransport}
      />
      Car
    </label>
    <label>
      <input
        type="radio"
        name="transport"
        value="Public Transport"
        bind:group={meansOfTransport}
      />
      Public transport
    </label>
  </div>
  <Checkbox
    value={returnTrip}
    label=" Return trip?"
    on:change={(event) => (returnTrip = event.target.checked)}
  />
  <Dropdown {route} {routes} label="One Way" on:change={updateRouteSelection} />
  {#if returnTrip}
    <InputComponent
      label="Route back"
      value={routeBack}
      on:input={updateRouteBack}
    />
  {/if}
  <InputComponent label="Costs" value={costs} on:input={updateCosts} />
</form>

<style>
  form {
    width: 50vw;
    margin: auto;
  }
</style>
