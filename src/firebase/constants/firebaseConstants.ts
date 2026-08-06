/**
 * Strict collection of handled error tokens returned by the cloud identity transport tier.
 */
export const FIREBASE_AUTH_ERRORS = {
  EMAIL_IN_USE: 'auth/email-already-in-use',
  INVALID_CREDENTIALS: 'auth/invalid-credential',
} as const;
