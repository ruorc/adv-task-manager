import { createContext } from 'react';

import type { SnackContextProps } from '../types/snack';

/**
 * React context storing the active client-side transient notification alerts dispatchers.
 */
export const SnackContext = createContext<SnackContextProps | undefined>(
  undefined
);
