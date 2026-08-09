import Joi from 'joi';

import { entityValidationSchema } from '@/views/WorkspacesDomain/context/KanbanFormModal';

import type { AppKanbanEntities } from '@/types/appKanbanTypes';

/**
 * Extended Joi validation schema enforcing payload constraints for finalized backend transmission.
 */
export const appKanbanEntitiesSchema: Joi.ObjectSchema<AppKanbanEntities> =
  entityValidationSchema
    .append({
      uid: Joi.string().required().messages({
        'any.required':
          'Database transaction failure: entity unique identifier is missing.',
        'string.empty':
          'Database transaction failure: entity unique identifier cannot be empty.',
      }),
      createdBy: Joi.string().trim().required().messages({
        'string.empty':
          'Database transaction failure: Creator unique identifier cannot be empty.',
      }),
      createdByName: Joi.string().trim().required().messages({
        'string.empty':
          'Database transaction failure: Creator display name cannot be empty.',
      }),
      assignees: Joi.object()
        .pattern(Joi.string().trim(), Joi.string().trim())
        .unknown(true)
        .required()
        .messages({
          'object.base':
            'Database transaction failure: Assignees structural data must be a valid key-value mapping.',
        }),
    })
    .presence('required') as unknown as Joi.ObjectSchema<AppKanbanEntities>;
