import { unstable_batchedUpdates as batch } from 'react-dom';
import {
  Listener,
  PersistenceAdapter,
  StoreOptions,
  StoreSetOptions,
  StoreSubscriberOptions,
  Updater,
} from '../types';
import getAdapter from '../persistence/getAdapter';
import hydrateValue from '../persistence/hydrateValue';
import { PERSISTENCE_KEY_BASE } from '../constants';

function createStore<T>(initialState: T, storeOptions?: StoreOptions) {
  let state: T = initialState;
  let adapter: PersistenceAdapter | null = null;
  const listeners = new Set<Listener<T>>();

  if (storeOptions && storeOptions.persistence) {
    adapter = getAdapter(storeOptions.persistence);
    if (!adapter) {
      throw new Error('Persistence adapter is not defined');
    }
    hydrateValue(adapter, storeOptions.persistence, initialState);
  }

  function get(): T {
    return state;
  }

  function set(next: Updater<T>, options?: StoreSetOptions) {
    const prev: T = state;
    state = typeof next === 'function' ? (next as any)(prev) : next;

    if (Object.is(prev, state) || options?.silent) return;

    if (storeOptions && storeOptions.persistence && adapter) {
      const storageKey = PERSISTENCE_KEY_BASE + storeOptions.persistence.type;
      adapter.set(storageKey, JSON.stringify(state));
    }

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
