import { PERSISTENCE_KEY_BASE } from '../constants';
import { PersistenceAdapter, PersistenceOptions } from '../types';

function hydrateValue<T>(
  adapter: PersistenceAdapter,
  persistenceOptions: PersistenceOptions,
  initialState: T,
) {
  if (adapter) {
    let state: any;
    const storageKey = PERSISTENCE_KEY_BASE + persistenceOptions.type;
    const rawValue: any = adapter.get(storageKey);
    if (rawValue) {
      try {
        state = JSON.parse(rawValue);
      } catch (error) {
        throw new Error('Failed to parse state for persistent object with key ' + storageKey);
      }
    } else {
      adapter.set(storageKey, JSON.stringify(initialState));
    }
  } else throw new Error('Persistence adapter is not defined');
}

export default hydrateValue;
