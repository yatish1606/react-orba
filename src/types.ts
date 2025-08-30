type Listener<T> = (state: T, prev: T) => void;
type EqualityFn<T> = (first: T, second: T) => boolean;

type StoreSetOptions = {
  silent?: boolean;
};

type StoreSubscriptionOptions = {
  fireImmediately?: boolean;
};

type Store<T> = {
  get: () => T;
  set: (next: T | ((prev: T) => T), options?: StoreSetOptions) => void;
  subscribe: (listener: Listener<T>, options?: StoreSubscriptionOptions) => () => void;
};

export { EqualityFn, Listener, Store, StoreSetOptions, StoreSubscriptionOptions };
