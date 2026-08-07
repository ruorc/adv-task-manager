export {
  /** Validation schema containing modular field definitions used to sanitize specific user attributes. */
  userFieldsValidation,
} from './validation';

export {
  /** Comprehensive validation schema utilized to verify the complete structural integrity of user domain entities. */
  appUserSchema,
} from './appUserSchema';

export type {
  /** Contract representing the centralized domain state and profile structure of an authenticated user. */
  AppUser,
} from './userTypes';
