import Joi from 'joi';

/**
 * Dynamic Joi validation schema for entities, enforcing conditional rules based on the active entity type context.
 */
export const entityValidationSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    'any.required': 'Title is required',
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 3 characters',
    'string.max': 'Title must be under 100 characters',
  }),

  description: Joi.string().max(500).allow('').messages({
    'string.max': 'Description must be under 500 characters',
  }),

  assignees: Joi.object().pattern(Joi.string(), Joi.string()).default({}),

  parent: Joi.string().allow(null).messages({
    'string.base': 'Parent must be a valid identifier or unassigned',
  }),

  grand: Joi.string().allow(null).messages({
    'string.base': 'Grandparent must be a valid identifier or unassigned',
  }),
});
