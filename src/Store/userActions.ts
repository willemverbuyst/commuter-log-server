import firebase from 'firebase/app';
import 'firebase/auth';
import { isSignedInStore, userStore } from './userState';

function updateIsSignedIn() {
  isSignedInStore.updateIsSignedIn();
}

function setUserEmail(email: string) {
  userStore.setUser(email);
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
      if (user && user.email) setUserEmail(user.email);
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
      if (user && user.email) setUserEmail(user.email);
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
      setUserEmail('');
      updateIsSignedIn();
    })
    .catch((error) => {
      // An error happened.
    });
};
