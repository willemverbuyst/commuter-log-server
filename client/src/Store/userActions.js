import { isSignedInStore, userStore } from './userState';

function updateIsSignedIn() {
  isSignedInStore.updateIsSignedIn();
}

function setUserEmail(email) {
  userStore.setUser(email);
}
