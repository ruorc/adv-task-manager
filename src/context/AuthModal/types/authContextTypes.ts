import { type ReactNode } from 'react';

import type { ReadonlyAuthForm } from './authFormTypes';

/**
 * Structural contract defining actionable operations exposed by the identity modal context stream.
 */
export interface AuthModalContextProps {
  /** Callback proxy engineered to cleanly dispatch login modal triggers */
  readonly openLogin: () => void;
  /** Callback proxy engineered to cleanly dispatch registration modal triggers */
  readonly openRegister: () => void;
  /** Callback proxy engineered to cleanly dispatch authentication modal closure requests */
  readonly closeAuth: () => void;
}

/**
 * Structural communication contract specifying core initialization parameters for the context wrapper.
 */
export interface AuthModalProviderProps {
  /** React node tree to be rendered within the context provider */
  readonly children: ReactNode;
  /** Callback proxy engineered to cleanly dispatch authentication form submission requests */
  readonly onSubmitAction: (
    data: ReadonlyAuthForm,
    isRegister: boolean
  ) => Promise<void>;
}
