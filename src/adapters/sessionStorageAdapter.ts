import { PersistenceAdapter } from '../types';

const sessionStorageAdapter: PersistenceAdapter = {
  get: (key) => {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  },
  set: (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key) => {
    sessionStorage.removeItem(key);
  },
  clear: () => {
    sessionStorage.clear();
  },
};

export default sessionStorageAdapter;
