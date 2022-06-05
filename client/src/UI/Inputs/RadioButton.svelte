<script lang="ts">
  export let value: string;
  export let group: string;
  export let name: string;
  export let onChange: any;
</script>

<label>
  <input type="radio" {name} {value} bind:group on:change={onChange} />
  {value}
</label>
