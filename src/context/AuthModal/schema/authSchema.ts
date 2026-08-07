import Joi from 'joi';

import { userFieldsValidation } from '@/context/UserEntity';

import type { ReadonlyAuthForm } from '../types/authFormTypes';

/**
 * Joi validation schema for authentication forms, adapting fields dynamically based on the operation mode.
 */
export const authSchema = Joi.object<ReadonlyAuthForm>({
  email: userFieldsValidation.email,
  password: userFieldsValidation.password,

  confirmPassword: Joi.string()
    .allow('')
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

  firstName: Joi.string().allow('').when('$mode', {
    is: 'register',
    then: userFieldsValidation.firstName,
    otherwise: Joi.optional(),
  }),

  lastName: Joi.string().allow('').when('$mode', {
    is: 'register',
    then: userFieldsValidation.lastName,
    otherwise: Joi.optional(),
  }),
});
