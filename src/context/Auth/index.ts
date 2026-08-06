import { GenericAuthProvider } from './providers/AuthProvider';
import { useAuth } from './hooks/useAuth';

import type { AuthContextProps } from './types/authContextTypes';

/**
 * Global authentication module entry point providing state management structures, hooks, and context.
 */
export {
  /** Component that initializes session monitoring and distributes the authentication state tree. */
  GenericAuthProvider,

  /** Hook to access the current authentication context values, user profile data, and session actions. */
  useAuth,
};

export type {
  /** Contract defining the operational state properties and asynchronous actions exposed by the context provider. */
  AuthContextProps,
};
