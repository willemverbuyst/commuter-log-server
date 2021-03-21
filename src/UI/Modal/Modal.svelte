<script>
  import { fly, scale } from 'svelte/transition';
  import { cubicIn } from 'svelte/easing';
</script>

<div>
  <div class="modal__left">
    <div
      class="modal__left--top"
      in:scale={{ duration: 400, easing: cubicIn }}
      out:fly={{ y: 300 }}
    />
    <div
      class="modal__left--bottom"
      in:scale={{ duration: 400, easing: cubicIn }}
      out:fly={{ y: 300 }}
    />
  </div>
  <div
    class="modal__center"
    in:scale={{ duration: 400, easing: cubicIn }}
    out:fly={{ y: 300 }}
  >
    <div class="form-container">
      <slot />
      <footer>
        <slot name="footer" />
      </footer>
    </div>
  </div>
  <div
    class="modal__right"
    in:scale={{ duration: 400, easing: cubicIn }}
    out:fly={{ y: 300 }}
  />
</div>

<style>
  .modal__left--top {
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
  .modal__left--bottom {
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

  .modal__center {
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

  .modal__right {
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

  .form-container {
    max-width: 500px;
    margin: auto;
    padding: 1rem;
    color: #aaa;
  }
</style>
