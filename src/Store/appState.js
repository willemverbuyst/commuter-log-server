import { writable } from 'svelte/store';

let showGrid = writable(true);

const showGridStore = {
  subscribe: showGrid.subscribe,

  toggleGrid: () => showGrid.update((show) => !show),
};

export default showGridStore;
