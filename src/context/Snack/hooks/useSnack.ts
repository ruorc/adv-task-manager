import { useContext } from 'react';

import { SnackContext } from '../context/SnackContext';

import type { SnackContextProps } from '../types/snackTypes';

/**
 * Safe consumer hook providing direct type-safe access to the global notification system stream.
 */
export const useSnack = (): SnackContextProps => {
  const context = useContext(SnackContext);

  if (!context) {
    throw new Error(
      '[SnackContext Error]: useSnack must be used strictly within an active SnackProvider scope.'
    );
  }

  return context;
};
