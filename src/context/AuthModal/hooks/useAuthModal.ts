import { useContext } from 'react';

import { AuthModalContext } from '../context/AuthModalContext';

import type { AuthModalContextProps } from '../types/authContextTypes';

/**
 * Standard telemetry interceptor hook extracting active authorization modal operational vectors.
 */
export const useAuthModal = (): AuthModalContextProps => {
  const context = useContext(AuthModalContext);

  if (!context) {
    throw new Error(
      'useAuthModal context extraction failed: hook must be invoked inside an AuthModalProvider block'
    );
  }

  return context;
};
