import { AuthModalProvider } from './providers/AuthModalProvider';
import { useAuthModal } from './hooks/useAuthModal';
import { userFieldsValidation } from './schemas/userFieldValidation';

import type {
  AuthModalContextProps,
  AuthModalProviderProps,
} from './types/authContextTypes';
import type { ReadonlyAuthForm } from './types/authFormTypes';

/** Core authentication infrastructure exports including providers and active context triggers. */
export {
  /** Component providing authentication modal state and actions. */
  AuthModalProvider,
  /** Hook to access and control the authentication modal state. */
  useAuthModal,
  /** Predefined evaluation boundaries validation rules mapping user fields. */
  userFieldsValidation,
};

/** Shared domain contract definitions, input structures, and validation schemas. */
export type {
  /** Properties and methods available in the authentication modal context. */
  AuthModalContextProps,
  /** Properties required by the authentication modal provider component. */
  AuthModalProviderProps,
  /** Immutable credentials payload captured from the authentication forms. */
  ReadonlyAuthForm,
};
