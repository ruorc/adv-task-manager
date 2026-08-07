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
