import Joi from 'joi';

const patternName = /^[\p{L}\s-]+$/u;

/**
 * Comprehensive validation schema for AppUser entity ensuring data integrity and adherence to defined constraints.
 */
export const userFieldsValidation = {
  uid: Joi.string().required().messages({
    'string.empty': 'User unique identifier cannot be empty.',
  }),

  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email field cannot be empty.',
      'string.email':
        'Provided parameter must comply with standard email validation constraints.',
    }),

  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password field cannot be empty.',
    'string.min':
      'Password parameters require a minimum length of 6 characters.',
  }),

  firstName: Joi.string().max(50).pattern(patternName).required().messages({
    'string.empty': 'First name is required for user account registration',
    'string.max':
      'Forename structural entries are capped at a maximum boundary of 50 characters',
    'string.pattern.base':
      'First name must contain only alphabetic characters, spaces, or hyphens',
  }),

  lastName: Joi.string().max(50).pattern(patternName).required().messages({
    'string.empty': 'Last name is required for user account registration',
    'string.max':
      'Family name structural entries are capped at a maximum boundary of 50 characters',
    'string.pattern.base':
      'Last name must contain only alphabetic characters, spaces, or hyphens',
  }),

  displayName: Joi.string().required().messages({
    'string.empty': 'Display name cannot be empty.',
  }),

  role: Joi.string().required().messages({
    'string.empty': 'User role permission level must be defined.',
  }),
};
