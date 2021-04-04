<script lang="ts">
  export let value: string;
  export let group: string;
  export let name: string;
</script>

<label>
  <input type="radio" {name} bind:value bind:group on:change />
  {value}
</label>
