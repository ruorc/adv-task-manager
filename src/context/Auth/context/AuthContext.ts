import { createContext } from 'react';

import type { AuthContextProps } from '../types/types';

/**
 * Internal React context token instance orchestrating security transport parameters.
 */
export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
