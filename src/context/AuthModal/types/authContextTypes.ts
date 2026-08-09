import { type ReactNode } from 'react';

import type { ReadonlyAuthForm } from './authFormTypes';

/**
 * Structural communication contract specifying core initialization
 * parameters for the context wrapper.
 */
export interface AuthModalProviderProps {
  /** React node tree to be rendered within the context provider. */
  readonly children: ReactNode;
  /** Callback proxy engineered to cleanly dispatch authentication form submission requests. */
  readonly onSubmitAction: (
    /** The validated authentication form values matching the active schema. */
    data: ReadonlyAuthForm,
    /** Flag explicitly distinguishing registration workflows from login paths. */
    isRegister: boolean
  ) => Promise<void>;
}

/**
 * Navigation triggers responsible for activating specific
 * authentication sub-views inside the modal container.
 */
export interface AuthModalNavigationActions {
  /** Callback proxy engineered to cleanly dispatch login modal triggers. */
  readonly openLogin: () => void;
  /** Callback proxy engineered to cleanly dispatch registration modal triggers. */
  readonly openRegister: () => void;
}

/**
 * Window control actions handling the termination
 * of the active dialog box presence.
 */
export interface AuthModalControlActions {
  /** Callback proxy engineered to cleanly dispatch authentication modal closure requests. */
  readonly closeAuth: () => void;
}

/**
 * Structural contract defining actionable operations exposed
 * by the identity modal context stream.
 */
export interface AuthModalContextProps
  extends AuthModalNavigationActions, AuthModalControlActions {}
