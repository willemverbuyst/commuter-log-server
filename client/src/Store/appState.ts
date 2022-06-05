import { Writable, writable } from 'svelte/store';

let showGrid: Writable<boolean> = writable(true);
let darkMode: Writable<boolean> = writable(false);
let isLoading: Writable<boolean> = writable(true);

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

export const isLoadingStore = {
  subscribe: isLoading.subscribe,

  updateIsLoading: () => isLoading.update((loading) => !loading),
};
