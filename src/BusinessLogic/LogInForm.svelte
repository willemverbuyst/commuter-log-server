<script>
  import { createEventDispatcher } from 'svelte';
  import Modal from '../UI/Modal/Modal.svelte';

  let email = '';
  let password = '';

  const dispatch = createEventDispatcher();

  function cancel() {
    dispatch('cancel');
  }

  function signUpWithEmailPassword() {
    console.log(email);
    console.log(password);
    dispatch('logIn');
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     var user = userCredential.user;
    //     console.log(user);
    //     dispatch('logIn');
    //     email = '';
    //     password = '';
    //   })
    //   .catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     console.log(errorCode);
    //     console.log(errorMessage);
    //   });
  }
</script>

<Modal on:cancel>
  <form>
    <div>
      <div class="labels">Email</div>
      <input
        type="email"
        value={email}
        on:input={(event) => (email = event.target.value)}
      />
    </div>
    <div>
      <div class="labels">Password</div>
      <input
        type="password"
        value={password}
        on:input={(event) => (password = event.target.value)}
      />
    </div>
  </form>
  <div class="button__container" slot="footer">
    <!-- <button on:click={signInWithEmailPassword}>Log In</button> -->
    <button on:click={signUpWithEmailPassword}>Sign Up</button>
    <button on:click={cancel}>Cancel</button>
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }

  .button__container {
    width: 100%;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
