import { useSyncExternalStore, useCallback } from 'react';
import { Store } from '../types';
import { unstable_batchedUpdates } from 'react-dom';

function useValue<T, U>(
  store: Store<T>,
  selector: (state: T) => U,
): [U, (updater: (previousState: U) => U) => void] {
  const getSnapshot = useCallback(() => selector(store.get()), [store, selector]);
  const state: U = useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);

  const setState = useCallback(
    (updater: (prevState: U) => U) => {
      unstable_batchedUpdates(() => {
        store.set((prevState) => {
          const selectedState = selector(prevState);
          const newState = typeof updater === 'function' ? updater(selectedState) : updater;
          return {
            ...prevState,
            ...mapSelectedStateToGlobalState(selector, newState, prevState),
          };
        });
      });
    },
    [store, selector],
  );

  return [state, setState];
}

function mapSelectedStateToGlobalState<T, U>(
  selector: (state: T) => U,
  newState: U,
  prevState: T,
): Partial<T> {
  const selected = selector(prevState);
  if (typeof selected !== 'object' || selected === null) {
    for (const key in prevState) {
      if ((prevState as any)[key] === selected) {
        return { [key]: newState } as Partial<T>;
      }
    }
    throw new Error('Could not map primitive selected state back to global state.');
  }

  const selectedKeys = Object.keys(selector(prevState) as Object);
  const updates: Partial<T> = {};

  selectedKeys.forEach((key) => {
    if (key in (newState as Object)) {
      updates[key as keyof T] = newState[key as keyof U] as unknown as T[keyof T];
    }
  });

  return updates;
}

export default useValue;
