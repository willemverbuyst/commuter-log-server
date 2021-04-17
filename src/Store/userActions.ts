import firebase from 'firebase/app';
import 'firebase/auth';
import { createEventDispatcher } from 'svelte';
import { isSignedInStore } from './userState';

// const dispatch = createEventDispatcher();

function updateIsSignedIn() {
  isSignedInStore.updateIsSignedIn();
}

export const signInWithEmailPassword = (
  email: string,
  password: string
): void => {
  // [START auth_signin_password]
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      if (user) console.log(user);
      updateIsSignedIn();
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
  // [END auth_signin_password]
};

export const signUpWithEmailPassword = (
  email: string,
  password: string
): void => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user);
      updateIsSignedIn();
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
};

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      updateIsSignedIn();
    })
    .catch((error) => {
      // An error happened.
    });
  console.log('user logged out');
};
