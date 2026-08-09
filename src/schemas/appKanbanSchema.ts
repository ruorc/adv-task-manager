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
    })
    .presence('required') as unknown as Joi.ObjectSchema<AppKanbanEntities>;
