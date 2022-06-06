<script>
  export let value;
  export let group;
  export let name;
  export let onChange;
</script>

<label>
  <input type="radio" {name} {value} bind:group on:change={onChange} />
  {value}
</label>
