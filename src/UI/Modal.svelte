<script>
  import { createEventDispatcher } from 'svelte';
  import { scale } from 'svelte/transition';
  import { cubicIn } from 'svelte/easing';
  import Button from '../UI/Button.svelte';

  export let title;

  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch('cancel');
  }
</script>

<div class="modal-backdrop" on:click={closeModal} />

<div
  class="modal"
  transition:scale={{
    delay: 0,
    duration: 400,
    easing: cubicIn,
  }}
>
  <h1>{title}</h1>
  <div class="content"><slot /></div>
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
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 10;
  }

  .modal {
    position: fixed;
    top: 10vh;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    min-height: 80vh;
    background: #ffa500;
    border-radius: 5px;
    z-index: 100;
  }

  h1 {
    padding: 1rem;
    margin: 0;
    border-bottom: 1px solid #ccc;
    font-family: 'Roboto Slab', sans-serif;
  }

  .content {
    padding: 1rem;
  }

  footer {
    padding: 1rem;
  }
</style>
