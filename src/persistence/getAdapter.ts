import sessionStorageAdapter from '../adapters/sessionStorageAdapter';
import { PersistenceAdapter, PersistenceOptions } from '../types';

function getAdapter(persistence: PersistenceOptions): PersistenceAdapter | null {
  switch (persistence.type) {
    case 'session':
      return sessionStorageAdapter;
    case 'none':
      return null;
    default:
      return null;
  }
}

export default getAdapter;
