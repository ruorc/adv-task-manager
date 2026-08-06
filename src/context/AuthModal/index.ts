import { AuthModalProvider } from './providers/AuthModalProvider';
import { useAuthModal } from './hooks/useAuthModal';

import type {
  AuthModalContextProps,
  AuthModalProviderProps,
} from './types/authContextTypes';
import type { ReadonlyAuthForm } from './types/authFormTypes';

/**
 * Public structural core entry contract exporting orchestrated authentication components,
 * react context consumers, and strongly typed definition layouts.
 */
export {
  /** Centralized Infrastructure Provider managing global authentication window visibility states */
  AuthModalProvider,
  /** Standard telemetry interceptor hook extracting active authorization modal operational vectors */
  useAuthModal,
};

export type {
  /** Structural contract defining actionable operations exposed by the identity modal context stream */
  AuthModalContextProps,
  /** Structural communication contract specifying core initialization parameters for the context wrapper */
  AuthModalProviderProps,
  /** Structural blueprint enforcing immutable authentication form parameters for login and registration processes */
  ReadonlyAuthForm,
};
