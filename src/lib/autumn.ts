// Autumn client placeholder. Add real initialization when ready.
// import { createAutumnClient } from 'autumn-js';

export function isFeatureEnabled(_featureId: string, _context?: { userId?: string }) {
  // TODO: Query Autumn or your backend for entitlements
  return false;
}

export function getProducts() {
  return import('../../autumn.config').then(m => (m as any).default.products);
}

