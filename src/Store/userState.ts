import { Writable, writable } from 'svelte/store';

let user: Writable<string> = writable('');
let isSignedIn: Writable<boolean> = writable(false);

export const userStore = {
  subscribe: user.subscribe,

  setUser: (userEmail: string) => {
    user.set(userEmail);
  },
};

export const isSignedInStore = {
  subscribe: isSignedIn.subscribe,

  updateIsSignedIn: () => isSignedIn.update((signedIn) => !signedIn),
};
