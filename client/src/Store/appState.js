import { writable } from 'svelte/store';

let showGrid = writable(true);
let darkMode = writable(false);
let isLoading = writable(true);

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
