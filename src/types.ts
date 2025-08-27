type Listener<T> = (state: T, prev: T) => void;
type EqualityFn<T> = (first: T, second: T) => boolean;

type Store<T> = {
  get: () => T;
  set: (next: T | ((prev: T) => T), opts?: { silent?: boolean }) => void;
  subscribe: (
    listener: Listener<T>,
    options?: { fireImmediately?: boolean }
  ) => () => void;
};

export { Listener, EqualityFn, Store };
