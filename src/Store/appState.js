import { subscribe } from 'svelte/internal';
import { writable } from 'svelte/store';

let showGrid = writable(true);
let darkMode = writable(false);
let dark = false;

export const darkModeStore = {
  subscribe: darkMode.subscribe,

  toggleMode: () => {
    darkMode.update((mode) => !mode);
  },
};

export const showGridStore = {
  subscribe: showGrid.subscribe,

  toggleGrid: () => showGrid.update((show) => !show),
};
