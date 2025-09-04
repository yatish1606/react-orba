type Listener<T> = (state: T, prev: T) => void;
type EqualityFn<T> = (first: T, second: T) => boolean;

type StoreSetOptions = {
  silent?: boolean;
};

type StoreSubscriberOptions = {
  fireImmediately?: boolean;
};

type Store<T> = {
  get: () => Readonly<T>;
  set: (next: Updater<T>, options?: StoreSetOptions) => void;
  subscribe: (listener: Listener<T>, options?: StoreSubscriberOptions) => () => void;
};

type Updater<T> = T | ((prev: T) => T);

export { EqualityFn, Listener, Store, StoreSetOptions, StoreSubscriberOptions, Updater };
