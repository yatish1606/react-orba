import { unstable_batchedUpdates as batch } from 'react-dom';
import { Listener } from '../types';

function createStore<T>(initialState: T) {
  let state: T = initialState;
  const listeners = new Set<Listener<T>>();

  function get(): T {
    return state;
  }

  function set(next: T | ((prev: T) => T)) {
    const prev: T = state;
    state = typeof next === 'function' ? (next as any)(prev) : next;

    if (Object.is(prev, state)) return;

    batch(() => {
      listeners.forEach((listener) => listener(state, prev));
    });
  }

  function subscribe(listener: Listener<T>) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  return { get, set, subscribe };
}

export default createStore;
