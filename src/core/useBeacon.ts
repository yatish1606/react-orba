import { useSyncExternalStore, useCallback } from "react";
import { Store } from "../types";
import { unstable_batchedUpdates } from "react-dom";

function useBeacon<T, U>(
  store: Store<T>,
  selector: (state: T) => U
): [U, (updater: (previousState: U) => U) => void] {
  const getSnapshot = useCallback(
    () => selector(store.get()),
    [store, selector]
  );
  const state: U = useSyncExternalStore(
    store.subscribe,
    getSnapshot,
    getSnapshot
  );

  const stateSetter = (updater: (previousState: U) => U) => {
    unstable_batchedUpdates(() => {
      store.set((previousState) => {
        const selectedState = selector(previousState);
        const newState =
          typeof updater === "function" ? updater(selectedState) : updater;

        return {
          ...previousState,
          ...mapSelectedStateToGlobalState(selector, newState, previousState),
        };
      });
    });
  };

  const updateState = useCallback(stateSetter, [store, selector]);

  return [state, updateState];
}

function mapSelectedStateToGlobalState<T, U>(
  selector: (state: T) => U,
  newState: U,
  prevState: T
): Partial<T> {
  const selectedKeys = Object.keys(selector(prevState) as Object);
  const updates: Partial<T> = {};

  selectedKeys.forEach((key) => {
    if (key in (newState as Object)) {
      updates[key as keyof T] = newState[
        key as keyof U
      ] as unknown as T[keyof T];
    }
  });

  return updates;
}

export default useBeacon;
