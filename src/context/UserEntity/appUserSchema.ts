import Joi from 'joi';

import { userFieldsValidation } from './validation';

import type { AppUser } from './userTypes';

/**
 * Joi validation schema for the application user object to ensure structural and data integrity.
 */
export const appUserSchema = Joi.object<AppUser>({
  uid: userFieldsValidation.uid,
  email: userFieldsValidation.email,
  firstName: userFieldsValidation.firstName,
  lastName: userFieldsValidation.lastName,
  displayName: userFieldsValidation.displayName,
  role: userFieldsValidation.role,
});
