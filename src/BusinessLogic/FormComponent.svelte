<script>
  import InputComponent from '../UI/InputComponent.svelte';
  import Datepicker from 'svelte-calendar';
  import Dropdown from '../UI/Dropdown.svelte';
  import { routes } from '../constants';

  let costs = '';
  let minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
  let maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

  let selectedDate = new Date();
  let format = '#{l} #{j} #{M} #{Y}';
  let meansOfTransport = 'Car';
  let returnTrip = false;
  let route = routes[1];
  let routeBack = routes[3];

  $: console.log(selectedDate);
  $: console.log(returnTrip);
  $: console.log(meansOfTransport);
  $: console.log(route);
  $: console.log(costs);
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
  <label>
    <input type="checkbox" bind:checked={returnTrip} />
    Return trip?
  </label>
  <Dropdown
    {route}
    {routes}
    label="One Way"
    on:change={(event) => (route = event.target.value)}
  />
  {#if returnTrip}
    <Dropdown
      route={routeBack}
      {routes}
      label="Return Trip"
      on:change={(event) => (routeBack = event.target.value)}
    />
  {/if}
  <InputComponent
    id="title"
    label="Costs"
    value={costs}
    on:input={(event) => (costs = event.target.value)}
  />
</form>

<style>
  form {
    width: 50vw;
    margin: auto;
  }
</style>
