import Joi from 'joi';

/**
 * Pure runtime blueprint serving as the single source of truth for Kanban entity fields.
 * Contains configuration configurations validated exclusively on the client form layout tier.
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

  /**
   * Validates the presentation-friendly array of tuples for form states.
   * Expects a structure matching an array of sub-arrays, where each nested
   * block contains exactly two string elements tracking user identity configurations.
   * Falls back to an empty collection layout if no records are selected by the user.
   */
  assignees: Joi.array()
    .items(
      Joi.array()
        .ordered(Joi.string().trim().required(), Joi.string().trim().required())
        .length(2)
    )
    .min(0)
    .default([])
    .messages({
      'array.base':
        'Assignees structural data must be a valid array of identity tuples.',
    }),

  parent: Joi.string().trim().allow(null).optional().messages({
    'string.base': 'Parent must be a valid identifier or unassigned.',
  }),

  grand: Joi.string().trim().allow(null).optional().messages({
    'string.base': 'Grandparent must be a valid identifier or unassigned.',
  }),
};
