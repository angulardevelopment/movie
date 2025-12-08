import { signalStore, withState, withMethods, patchState, withComputed, withHooks } from '@ngrx/signals';

// Define the shape of the state
export interface LikeState {
  count: number;
}

// Set the initial state
const initialState: LikeState = {
  count: 0,
};

// Create the SignalStore
export const LikeStore = signalStore(
  { providedIn: 'root' }, // Makes the store available app-wide
  withState(initialState), // Adds the state to the store
  
  // Adds methods to update the state
  withMethods((store) => ({
    increment() {
      // Use patchState to immutably update the state
      patchState(store, { count: store.count() + 1 });
    },
    decrement() {
      patchState(store, { count: store.count() - 1 });
    },
    reset() {
      patchState(store, initialState);
    },
  })),
//   withComputed(([]) => ({ [] })),
// withHooks({ […] })
);