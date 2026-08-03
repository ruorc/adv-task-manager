import { APPLICATION_LOCALE } from '@/constants/localeConstants';

/**
 * Immutable domain runtime operation modes.
 */
export const AUTH_MODES = {
  LOGIN: 'login',
  REGISTER: 'register',
} as const;

/**
 * Strict collection of handled error tokens returned by the cloud identity transport tier.
 */
export const FIREBASE_AUTH_ERRORS = {
  EMAIL_IN_USE: 'auth/email-already-in-use',
  INVALID_CREDENTIALS: 'auth/invalid-credential',
} as const;

/**
 * Interface copy fragments and semantic telemetry messaging structures.
 * Binds directly to the global localized dictionary configuration layout.
 */
export const AUTH_TEXTS = APPLICATION_LOCALE.auth.texts;
