import { AUTH_MODES } from '../constants/authModalConstants';

/**
 * Valid operational modes for the authentication workflow (e.g., login or registration).
 */
export type AuthModeType = (typeof AUTH_MODES)[keyof typeof AUTH_MODES];

/**
 * Immutable credentials payload captured from the authentication forms.
 */
export interface ReadonlyAuthForm {
  /** The unique email address provided by the user. */
  readonly email: string;
  /** The account password credentials. */
  readonly password: string;
  /** Optional password confirmation used exclusively during registration. */
  readonly confirmPassword?: string;
  /** Optional first name of the registering user. */
  readonly firstName?: string;
  /** Optional last name of the registering user. */
  readonly lastName?: string;
}

/**
 * Configuration and lifecycle management properties for rendering the authentication modal dialog.
 */
export interface AuthModalProps {
  /** Controls the visibility state of the authentication modal. */
  readonly isOpen: boolean;
  /** Callback triggered to request closing the modal interface. */
  readonly onClose: () => void;
  /** Optional callback executed immediately after a successful authentication event. */
  readonly onAuthSuccess?: () => void;
  /** Optional default mode the form should display upon opening. */
  readonly initialMode?: AuthModeType;
  /** Asynchronous handler delegating the credential payload submission to parent architectures. */
  readonly onSubmitAction: (
    data: ReadonlyAuthForm,
    isRegister: boolean
  ) => Promise<void>;
}
