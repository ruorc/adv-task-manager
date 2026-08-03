import { type ReactNode } from 'react';

/**
 * Structural contract defining actionable operations exposed by the identity modal context stream.
 */
export interface AuthModalContextProps {
  /** Trigger execution sequence booting the modal structure directly into login status mapping */
  readonly openLogin: () => void;
  /** Trigger execution sequence booting the modal structure directly into registration status mapping */
  readonly openRegister: () => void;
  /** Terminate the active authentication overlay layout status stream */
  readonly closeAuth: () => void;
}

/**
 * Structural communication contract specifying core initialization parameters for the context wrapper.
 */
export interface AuthModalProviderProps {
  /** The composite React element node sub-tree clusters nested within the context boundary */
  readonly children: ReactNode;
}
