<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import FormButton from '../UI/Buttons/FormButton.svelte';
  import Modal from '../UI/Modal/Modal.svelte';
  import LoginInput from '../UI/Inputs/LoginInput.svelte';
  import {
    signInWithEmailPassword,
    signUpWithEmailPassword,
  } from '../Store/userActions';

  let email = '';
  let password = '';

  const dispatch = createEventDispatcher();

  function cancel() {
    dispatch('cancel');
  }

  function signIn() {
    signInWithEmailPassword(email, password);
    dispatch('logIn');
    email = '';
    password = '';
  }

  function signUp() {
    signUpWithEmailPassword(email, password);
    dispatch('logIn');
    email = '';
    password = '';
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
    <FormButton on:click={signIn}>Log In</FormButton>
    <FormButton on:click={signUp}>Sign Up</FormButton>
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
