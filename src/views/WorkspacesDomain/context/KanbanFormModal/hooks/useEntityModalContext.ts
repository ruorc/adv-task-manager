import { useContext } from 'react';

import { EntityModalContext } from '../context/UniversalEntityModalContext';

import type { ModalContextValue } from '../types/types';

/**
 * Hook to access the universal entity modal form API.
 * Throws an error if invoked outside of an `EntityModalProvider`.
 */
export const useEntityModalContext = (): ModalContextValue => {
  const context = useContext(EntityModalContext);

  if (!context) {
    throw new Error(
      '[EntityModalContext Error]: useEntityModalContext must be used within an EntityModalProvider.'
    );
  }

  return context;
};
