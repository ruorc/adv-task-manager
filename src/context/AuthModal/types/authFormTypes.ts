import { AUTH_MODES } from '../constants/authConstants';

/**
 * Strict structural token representative mapping indicating valid operational system states.
 */
export type AuthModeType = (typeof AUTH_MODES)[keyof typeof AUTH_MODES];

/**
 * Structural credentials blueprint enforcing compile-time immutable parameters.
 */
export interface ReadonlyAuthForm {
  /** Target communication electronic mail account entry token */
  readonly email: string;
  /** Secure encrypted character string vector confirming client validation profiles */
  readonly password: string;
  /** Verification vector to confirm identical match against primary password parameter */
  readonly confirmPassword?: string;
  /** Alphanumeric sequence representing the individual operator personal forename */
  readonly firstName?: string;
  /** Alphanumeric sequence representing the individual operator personal family name */
  readonly lastName?: string;
}

/**
 * Structural communication contract defining parameters required to render the authentication dialog.
 */
export interface AuthModalProps {
  /** Reactive state flag determining if the overlay view is visible */
  readonly isOpen: boolean;
  /** Callback executed on dialog dismissal or cancellation */
  readonly onClose: () => void;
  /** Optional callback triggered immediately upon successful session establishment */
  readonly onAuthSuccess?: () => void;
  /** Force the modal stream to boot directly into a specific architectural state alignment */
  readonly initialMode?: AuthModeType;
}
