import { unstable_batchedUpdates as batch } from 'react-dom';
import { Listener, StoreOptions, StoreSetOptions, StoreSubscriberOptions, Updater } from '../types';

const PERSISTENCE_KEY_BASE: string = 'orba-ps-';

function createStore<T>(initialState: T, storeOptions?: StoreOptions) {
  let state: T = initialState;
  const listeners = new Set<Listener<T>>();

  function get(): T {
    return state;
  }

  function set(next: Updater<T>, options?: StoreSetOptions) {
    const prev: T = state;
    state = typeof next === 'function' ? (next as any)(prev) : next;

    if (Object.is(prev, state) || options?.silent) return;

    batch(() => {
      listeners.forEach((listener) => listener(state, prev));
    });
  }

  function subscribe(listener: Listener<T>, options?: StoreSubscriberOptions) {
    listeners.add(listener);
    if (options?.fireImmediately) {
      listener(state, state);
    }
    return () => listeners.delete(listener);
  }

  return { get, set, subscribe };
}

export default createStore;
