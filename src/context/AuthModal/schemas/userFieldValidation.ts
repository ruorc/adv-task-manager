import Joi from 'joi';

const patternName = /^[\p{L}\s-]+$/u;

/**
 * Object containing Joi validation rules for user profile fields including email, password, first name, and last name.
 */
export const userFieldsValidation = {
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .messages({
      'string.empty': 'Email field cannot be empty.',
      'string.email': 'Provided parameter must comply with standard email validation constraints.',
    }),

  password: Joi.string().min(6).messages({
    'string.empty': 'Password field cannot be empty.',
    'string.min': 'Password parameters require a minimum length of 6 characters.',
  }),

  firstName: Joi.string().max(50).pattern(patternName).empty('').messages({
    'string.empty': 'First name is required for user account registration',
    'string.max': 'Forename structural entries are capped at a maximum boundary of 50 characters',
    'string.pattern.base': 'First name must contain only alphabetic characters, spaces, or hyphens',
  }),

  lastName: Joi.string().max(50).pattern(patternName).empty('').messages({
    'string.empty': 'Last name is required for user account registration',
    'string.max': 'Family name structural entries are capped at a maximum boundary of 50 characters',
    'string.pattern.base': 'Last name must contain only alphabetic characters, spaces, or hyphens',
  }),
};
