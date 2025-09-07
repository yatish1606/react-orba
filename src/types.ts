type Listener<T> = (state: T, prev: T) => void;
type EqualityFn<T> = (first: T, second: T) => boolean;

type PersistenceAdapter = {
  get: <T>(key: string) => T | null;
  set: <T>(key: string, value: T) => void;
  remove: (key: string) => void;
  clear: () => void;
};

type PeristenceType = 'none' | 'session' | 'local-storage';

type PersistenceOptions = {
  type: PeristenceType;
  key: string;
  timeToLive?: number;
};

type StoreOptions = {
  persistence?: PersistenceOptions;
};

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

export {
  PersistenceAdapter,
  PeristenceType,
  PersistenceOptions,
  StoreOptions,
  EqualityFn,
  Listener,
  Store,
  StoreSetOptions,
  StoreSubscriberOptions,
  Updater,
};
