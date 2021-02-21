<script>
  import { createEventDispatcher } from 'svelte';
  import { fade, fly, scale } from 'svelte/transition';
  import { cubicIn } from 'svelte/easing';
  import Button from '../UI/Button.svelte';

  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch('cancel');
  }
</script>

<div class="modal-backdrop" on:click={closeModal} />
<div
  class="modal"
  in:scale={{ duration: 400, easing: cubicIn }}
  out:fly={{ y: 300 }}
>
  <div class="content">
    <h1>Add a day to log</h1>
    <slot />
  </div>
  <footer>
    <slot name="footer">
      <Button on:click={closeModal}>Close</Button>
    </slot>
  </footer>
</div>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .modal:before {
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px) saturate(100%) contrast(45%) brightness(130%);
    content: '';
    height: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    border-radius: 7px;
    box-shadow: 5px 3px 5px 0px rgba(0, 0, 0, 0.25);
    -webkit-box-shadow: 5px 3px 5px 0px rgba(0, 0, 0, 0.25);
    -moz-box-shadow: 5px 3px 5px 0px rgba(0, 0, 0, 0.25);
    z-index: -100;
  }

  .modal {
    position: fixed;
    top: 10vh;
    left: 50%;
    transform: translateX(-50%);
    width: 60vw;
    min-height: 80vh;
    z-index: 3000;
    border-radius: 7px;
  }

  .content {
    padding: 1rem;
  }
</style>
