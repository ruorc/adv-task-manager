import Joi from 'joi';

/**
 * Pure runtime blueprint serving as the single source of truth for Kanban entity fields.
 */
export const kanbanFieldsValidation = {
  title: Joi.string().trim().min(3).max(100).messages({
    'any.required': 'Title is required.',
    'string.empty': 'Title is required.',
    'string.min': 'Title must be at least 3 characters.',
    'string.max': 'Title must be under 100 characters.',
  }),

  description: Joi.string().trim().max(500).allow('').messages({
    'string.max': 'Description must be under 500 characters.',
  }),

  assignees: Joi.array()
    .items(Joi.string().trim())
    .min(0)
    .default([])
    .messages({
      'array.base':
        'Assignees structural data must be a valid collection of user identifiers.',
    }),

  createdBy: Joi.string().trim().messages({
    'string.empty': 'Creator unique identifier cannot be empty.',
  }),

  createdByName: Joi.string().trim().messages({
    'string.empty': 'Creator display name cannot be empty.',
  }),

  isCompleted: Joi.boolean(),

  isDeleted: Joi.boolean(),

  parent: Joi.string().trim().allow(null).optional().messages({
    'string.base': 'Parent must be a valid identifier or unassigned.',
  }),

  grand: Joi.string().trim().allow(null).optional().messages({
    'string.base': 'Grandparent must be a valid identifier or unassigned.',
  }),
};
