import { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';

import type { AuthContextProps } from '../types/types';

/**
 * Standard security interceptor hook extracting active authorization operational vectors.
 */
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be evaluated strictly inside an active AuthProvider container scope'
    );
  }

  return context;
};
