<script>
  import { createEventDispatcher } from 'svelte';
  import { fly, scale } from 'svelte/transition';
  import { cubicIn } from 'svelte/easing';
  import Button from '../Buttons/Button.svelte';

  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch('cancel');
  }
</script>

<div class="modal-backdrop" on:click={closeModal} />
<div>
  <div class="modal-left">
    <div
      class="modal-left--top"
      in:scale={{ duration: 400, easing: cubicIn }}
      out:fly={{ y: 300 }}
    />
    <div
      class="modal-left--bottom"
      in:scale={{ duration: 400, easing: cubicIn }}
      out:fly={{ y: 300 }}
    />
  </div>
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
        <Button on:click={closeModal}>Add</Button>
      </slot>
    </footer>
  </div>
  <div
    class="modal-right"
    in:scale={{ duration: 400, easing: cubicIn }}
    out:fly={{ y: 300 }}
  />
</div>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .modal-left--top {
    position: fixed;
    top: 0;
    left: 0;
    width: 20vw;
    min-height: 50vh;
    background: -webkit-radial-gradient(
      65% 60%,
      circle,
      transparent 30%,
      #222 30%
    );
  }
  .modal-left--bottom {
    position: fixed;
    top: 50vh;
    left: 0;
    width: 20vw;
    min-height: 50vh;
    background: -webkit-radial-gradient(
      75% 80%,
      circle,
      transparent 15%,
      #222 15%
    );
  }

  .modal-right {
    position: fixed;
    top: 0;
    right: 0;
    width: 20vw;
    min-height: 100vh;
    background: -webkit-radial-gradient(
      35% 70%,
      circle,
      transparent 15%,
      #222 15%
    );
  }

  .modal {
    position: fixed;
    top: 0;
    left: 20vw;
    width: 60vw;
    min-height: 100vh;
    background: -webkit-radial-gradient(
      90% 20%,
      circle,
      transparent 5%,
      #222 5%
    );
  }

  .content {
    padding: 1rem;
    color: #aaa;
  }
</style>
