import { GenericAuthProvider } from './providers/AuthProvider';
import { useAuth } from './hooks/useAuth';
import { useRequiredAuth } from './hooks/useRequiredAuth';

import type { AuthContextProps } from './types/authContextTypes';
import type { AuthService } from './types/authServiceTypes';

export {
  /** Component that initializes session monitoring and distributes the authentication state tree. */
  GenericAuthProvider,
  /** Hook to access the current authentication context values, user profile data, and session actions. */
  useAuth,
  /** Explicit structural validation barrier enforcing complete presence of identity data records without fallback states. */
  useRequiredAuth,
};

export type {
  /** Contract defining the operational state properties and asynchronous actions exposed by the context provider. */
  AuthContextProps,
  /** Contract defining core asynchronous operation methods for managing authentication sessions. */
  AuthService,
};
