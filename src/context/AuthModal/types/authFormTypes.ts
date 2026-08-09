import type { RegistrationPayload } from '@/types/appUserTypes';
import type { AuthModeType } from '../constants/authModalConstants';

export type { AuthModeType };

/**
 * Subset of registration payload fields that are strictly mandatory during
 * account creation but remain optional within the underlying UI input forms.
 */
type OptionalFormFields = Pick<RegistrationPayload, 'firstName' | 'lastName'>;

/**
 * Immutable credentials payload captured from the authentication forms.
 */
export interface ReadonlyAuthForm extends Omit<
  RegistrationPayload,
  keyof OptionalFormFields
> {
  /** Optional first name of the registering user. */
  readonly firstName?: RegistrationPayload['firstName'];
  /** Optional last name of the registering user. */
  readonly lastName?: RegistrationPayload['lastName'];
  /** Optional password confirmation used exclusively during registration. */
  readonly confirmPassword?: string;
}
