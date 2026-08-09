import { useContext } from 'react';

import { ConfirmContext } from '../context/ConfirmContext';

import type { ConfirmContextType } from '../types/confirmTypes';

/**
 * Hook to access the confirmation dialog API.
 * Throws an error if invoked outside of a `ConfirmProvider`.
 */
export const useConfirm = (): ConfirmContextType => {
  const context = useContext(ConfirmContext);

  if (!context) {
    throw new Error(
      '[ConfirmContext Error]: useConfirm must be used within a ConfirmProvider.'
    );
  }

  return context;
};
