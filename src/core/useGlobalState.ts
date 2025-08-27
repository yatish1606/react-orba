import { useSyncExternalStore, useCallback } from "react";
import { Store } from "../types";

function useGlobalState<T, U>(store: Store<T>, selector: (state: T) => U): U {
  const getSnapshot = useCallback(
    () => selector(store.get()),
    [store, selector]
  );
  return useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
}

export default useGlobalState;
