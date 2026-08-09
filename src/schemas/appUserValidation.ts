import Joi from 'joi';

/**
 * Joi validation schema group for hidden user profile attributes, covering unique identifiers, display names, and role permission levels.
 */
export const userHiddenFieldsValidation = {
  uid: Joi.string().trim().messages({
    'string.empty': 'User unique identifier cannot be empty.',
  }),

  displayName: Joi.string().trim().messages({
    'string.empty': 'Display name cannot be empty.',
  }),

  role: Joi.string().trim().messages({
    'string.empty': 'User role permission level must be defined.',
  }),
};
