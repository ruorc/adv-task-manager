import Joi from 'joi';

import type { ReadonlyAuthForm } from '../types/authFormTypes';

/**
 * Conditional domain validation schema managing strict field requirements
 * dynamically based on active authentication operational modes and character constraints.
 */
export const authSchema = Joi.object<ReadonlyAuthForm>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email field cannot be evaluated as an empty string',
      'string.email':
        'Provided parameter must comply with standard email validation constraints',
    }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password field cannot be evaluated as an empty string',
    'string.min':
      'Password parameters require a minimum length of 6 characters',
  }),
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
  firstName: Joi.string()
    .max(50)
    .allow('')
    .when('$mode', {
      is: 'register',
      then: Joi.string()
        .pattern(/^[\p{L}\s-]+$/u)
        .required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'string.empty': 'First name is required for user account registration',
      'string.max':
        'Forename structural entries are capped at a maximum boundary of 50 characters',
      'string.pattern.base':
        'First name must contain only alphabetic characters, spaces, or hyphens',
      'any.required': 'First name is required for user account registration',
    }),
  lastName: Joi.string()
    .max(50)
    .allow('')
    .when('$mode', {
      is: 'register',
      then: Joi.string()
        .pattern(/^[\p{L}\s-]+$/u)
        .required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'string.empty': 'Last name is required for user account registration',
      'string.max':
        'Family name structural entries are capped at a maximum boundary of 50 characters',
      'string.pattern.base':
        'Last name must contain only alphabetic characters, spaces, or hyphens',
      'any.required': 'Last name is required for user account registration',
    }),
});
