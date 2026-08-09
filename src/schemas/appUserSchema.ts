import Joi from 'joi';

import { userFieldsValidation } from '@/context/AuthModal';
import { userHiddenFieldsValidation } from './appUserValidation';

import type { AppUser } from '@/types/appUserTypes';

/**
 * Combined Joi validation schema for the entire application user profile,
 * enforcing absolute presence for all inherited and server-managed identity fields.
 */
export const appUserSchema = Joi.object<AppUser>({
  email: userFieldsValidation.email,
  firstName: userFieldsValidation.firstName,
  lastName: userFieldsValidation.lastName,

  uid: userHiddenFieldsValidation.uid,
  displayName: userHiddenFieldsValidation.displayName,
  role: userHiddenFieldsValidation.role,
}).presence('required');
