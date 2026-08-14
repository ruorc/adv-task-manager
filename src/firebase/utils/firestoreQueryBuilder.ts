import { where, type QueryConstraint } from 'firebase/firestore';

import type { CollectionQueryParams } from '../types/firestoreTypes';

/**
 * Pure utility that maps UI query parameters into standard Firestore query constraints.
 * Automatically injects soft-deletion filtering and builds prefix-based lookups.
 */
export function buildFirestoreQuery(
  queryParams?: CollectionQueryParams
): QueryConstraint[] {
  const constraints: QueryConstraint[] = [where('isDeleted', '!=', true)];

  if (!queryParams) return constraints;

  const { filters, search } = queryParams;

  if (filters) {
    Object.entries(filters).forEach(([field, value]) => {
      if (value !== undefined && field !== 'isDeleted') {
        constraints.push(where(field, '==', value));
      }
    });
  }

  if (search && search.value.trim() !== '') {
    constraints.push(
      where(search.field, '>=', search.value),
      where(search.field, '<=', search.value + '\uf8ff')
    );
  }

  return constraints;
}
