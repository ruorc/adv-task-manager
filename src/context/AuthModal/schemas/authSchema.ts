import Joi from 'joi';

import { userFieldsValidation } from './userFieldValidation';

import type { ReadonlyAuthForm } from '../types/authFormTypes';

/**
 * Dynamic Joi validation schema for the authentication form.
 * Conditionally enforces strict profile details during registration based on the runtime context mode.
 */
export const authSchema = Joi.object<ReadonlyAuthForm>({
  email: userFieldsValidation.email.required(),
  password: userFieldsValidation.password.required(),

  firstName: Joi.any().when('$mode', {
    is: 'register',
    then: userFieldsValidation.firstName.required(),
    otherwise: Joi.optional(),
  }),

  lastName: Joi.any().when('$mode', {
    is: 'register',
    then: userFieldsValidation.lastName.required(),
    otherwise: Joi.optional(),
  }),

  confirmPassword: Joi.string()
    .empty('')
    .when('$mode', {
      is: 'register',
      then: Joi.string().valid(Joi.ref('password')).required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'any.only':
        'The validation credential confirmation matrix does not match the primary input vector',
      'any.required':
        'Confirmation password is required for account registration',
    }),
});
