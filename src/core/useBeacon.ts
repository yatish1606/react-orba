import { useSyncExternalStore, useCallback } from "react";
import { Store } from "../types";

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

  return [state, () => {}];
}

export default useBeacon;
