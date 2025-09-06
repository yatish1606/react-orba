import sessionStorageAdapter from '../adapters/sessionStorageAdapter';
import { PersistenceOptions } from '../types';

function getAdapter(persistence: PersistenceOptions) {
  switch (persistence.type) {
    case 'session':
      return sessionStorageAdapter;
    case 'none':
      return null;
    default:
      throw new Error(`Unsupported persistence type: ${persistence.type}`);
  }
}

export default getAdapter;
