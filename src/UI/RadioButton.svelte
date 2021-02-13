<script>
  export let value;
  export let group;
  export let name;
</script>

<label>
  <input type="radio" {name} {value} bind:group on:change />
  {value}
</label>
