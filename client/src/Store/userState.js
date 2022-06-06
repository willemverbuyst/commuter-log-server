import { writable } from 'svelte/store';

let user = writable('');
let isSignedIn = writable(false);

export const userStore = {
  subscribe: user.subscribe,

  setUser: (email) => {
    user.set(email);
  },
};

export const isSignedInStore = {
  subscribe: isSignedIn.subscribe,

  setSignedInToTrue: () => isSignedIn.set(true),

  updateIsSignedIn: () => isSignedIn.update((signedIn) => !signedIn),
};
