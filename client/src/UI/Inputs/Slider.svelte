<script>
  import {
    getNumberOfWeeks,
    getYearAndWeekNumber,
  } from '../../helpers/logDataLogic';

  export let weekIndexInLogData;
  export let logData;

  let yearAndWeekNumber;

  const max = getNumberOfWeeks(logData) - 1;
  $: yearAndWeekNumber = getYearAndWeekNumber(logData, weekIndexInLogData);
</script>

<div class="slider-value">
  week {yearAndWeekNumber[1]} - {yearAndWeekNumber[0]}
</div>
<input
  type="range"
  min="0"
  {max}
  value={weekIndexInLogData}
  on:change
  class="slider"
/>

<style>
  .slider-value {
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 1rem;
    color: var(--main-txt-color);
  }

  .slider {
    width: 100%;
    -webkit-appearance: none;
    height: 25px;
    background: var(--main-bg-color);
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    box-shadow: inset 4px 4px 4px var(--main-bg-color-dark),
      inset -4px -4px 4px var(--main-bg-color-light);
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
    background: var(--main-bg-color);
    cursor: pointer;
    box-shadow: inset 1px 1px 1px var(--main-bg-color-light),
      ark inset -1px -1px 1px var(--main-bg-color-dark);
  }

  .slider::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 2px;
    background: var(--main-bg-color);
    cursor: pointer;
    box-shadow: inset 1px 1px 1px var(--main-bg-color-light),
      inset -1px -1px 1px var(--main-bg-color-dark);
  }
</style>
