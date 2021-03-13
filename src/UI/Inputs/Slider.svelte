<script>
  export let weekNumber;
</script>

<div class="slider-value">week {weekNumber}</div>
<input
  type="range"
  min="3"
  max="8"
  value={weekNumber}
  on:change
  class="slider"
/>

<style>
  .slider-value {
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #aaa;
  }
  .slider {
    width: 100%;
    -webkit-appearance: none;
    height: 25px;
    background: #333;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    box-shadow: inset 4px 4px 4px #222, inset -4px -4px 4px #444;
  }

  .slider:hover {
    opacity: 1;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 2px;
    background: #333;
    cursor: pointer;
    box-shadow: inset 1px 1px 1px #444, inset -1px -1px 1px #222;
  }

  .slider::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 2px;
    background: #333;
    cursor: pointer;
    box-shadow: inset 1px 1px 1px #444, inset -1px -1px 1px #222;
  }
</style>
