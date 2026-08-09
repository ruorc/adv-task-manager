/**
 * Represents the authenticated user profile across the application with mandatory core details.
 */
export interface AppUser {
  /** Unique identifier for the user. */
  readonly uid: string;
  /** Primary email address of the user. */
  readonly email: string;
  /** First name of the user. */
  readonly firstName: string;
  /** Last name of the user. */
  readonly lastName: string;
  /** Full name displayed in the user interface, derived from first and last names. */
  readonly displayName: string;
  /**
   * System access level and permissions role.
   * Supports specific core roles with an open-ended extension for future custom roles.
   */
  readonly role: 'user' | 'admin' | (string & {});
}

/**
 * Subset of user profile properties exclusively generated, assigned, or managed by the server architecture and database layers.
 */
type UserHiddenFields = Pick<AppUser, 'uid' | 'displayName' | 'role'>;

/**
 * Payload strictly required by the authentication service to register a new user.
 * Built directly from AppUser by omitting server/DB generated fields and appending credentials.
 */
export interface RegistrationPayload extends Omit<
  AppUser,
  keyof UserHiddenFields
> {
  /** The account password credentials. */
  readonly password: string;
}

/**
 * Payload strictly required by the authentication service to sign in an existing user.
 */
export type LoginPayload = Pick<RegistrationPayload, 'email' | 'password'>;
