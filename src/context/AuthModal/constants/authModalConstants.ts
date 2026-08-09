/**
 * Interface copy fragments and semantic telemetry messaging structures.
 * Binds directly to the global localized dictionary configuration layout.
 */
export const AUTH_TEXTS = {
  SUBMIT_PROCESSING: 'Processing request...',
  SUBMIT_LOGIN: 'Login',
  SUBMIT_REGISTER: 'Create Account',
  TOGGLE_PROMPT_REGISTER: 'Already hold an active identity? ',
  TOGGLE_PROMPT_LOGIN: 'New to our tracking platform? ',
  ERROR_MATCH: 'The validation credential confirmation matrix does not match.',
  ERROR_GENERIC: 'An unhandled error degraded the security transport stream.',
};

/**
 * Immutable domain runtime operation modes.
 */
export const AUTH_MODES = {
  LOGIN: 'login',
  REGISTER: 'register',
} as const;

/**
 * Valid operational modes for the authentication workflow (e.g., login or registration).
 */
export type AuthModeType = (typeof AUTH_MODES)[keyof typeof AUTH_MODES];
