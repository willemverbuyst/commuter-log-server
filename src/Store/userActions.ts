import { isSignedInStore, userStore } from './userState';

function updateIsSignedIn() {
  isSignedInStore.updateIsSignedIn();
}

function setUserEmail(email: string) {
  userStore.setUser(email);
}
