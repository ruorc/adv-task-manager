import { AuthProvider } from './providers/AuthProvider';
import { useAuth } from './hooks/useAuth';

import type { AuthContextProps } from './types/types';

/**
 * Public structural core entry contract exporting orchestrated authentication provider components,
 * reactive context hooks, and strongly typed interface definition layouts.
 */
export {
  /** Centralized Infrastructure Provider managing global core firebase authentication session pipelines */
  AuthProvider,
  /** Standard security interceptor hook extracting active authorization operational vectors */
  useAuth,
};

export type {
  /** Structural definition contract specifying credentials tokens exposed by the authentication context tree */
  AuthContextProps,
};
