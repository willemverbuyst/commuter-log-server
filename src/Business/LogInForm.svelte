<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import firebase from 'firebase/app';
  import 'firebase/auth';
  import FormButton from '../UI/Buttons/FormButton.svelte';
  import Modal from '../UI/Modal/Modal.svelte';
  import LoginInput from '../UI/Inputs/LoginInput.svelte';

  let email = '';
  let password = '';

  const dispatch = createEventDispatcher();

  function cancel() {
    dispatch('cancel');
  }

  function signInWithEmailPassword() {
    console.log(email);
    console.log(password);
    // [START auth_signin_password]
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        dispatch('logIn');
        email = '';
        password = '';
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    // [END auth_signin_password]
  }

  function signUpWithEmailPassword() {
    console.log(email);
    console.log(password);
    // dispatch('logIn');
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        dispatch('logIn');
        email = '';
        password = '';
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  }
</script>

<Modal on:cancel>
  <h1>Log In</h1>
  <form>
    <LoginInput
      label="Email"
      type="email"
      valid={true}
      validityMessage="Please write a correct email"
      bind:value={email}
    />
    <LoginInput
      label="Password"
      type="password"
      valid={true}
      validityMessage="Please enter a password"
      bind:value={password}
    />
  </form>
  <div class="button__container" slot="footer">
    <FormButton on:click={signInWithEmailPassword}>Log In</FormButton>
    <FormButton on:click={signUpWithEmailPassword}>Sign Up</FormButton>
    <FormButton on:click={cancel}>Cancel</FormButton>
  </div></Modal
>

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
