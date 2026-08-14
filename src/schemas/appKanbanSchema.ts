import Joi from 'joi';
import { entityValidationSchema } from '../views/WorkspacesDomain/context/KanbanFormModal/schemas/entityValidationSchema';
import type { AppKanbanEntities } from '@/types/appKanbanTypes';

const dbChildNodeSchema = Joi.object({
  id: Joi.string().trim().required(),
  title: Joi.string().trim().required(),
  description: Joi.string().trim().allow('').required(),
});

/**
 * Global database validation blueprint enforcing structural rules across the core storage tier.
 * Extends the baseline client layout schema by appending mandatory system context parameters
 * and re-validating assignees as a strict dictionary object layout before Firestore commit.
 */
export const appKanbanEntitiesSchema = entityValidationSchema
  .append({
    uid: Joi.string().required(),
    createdBy: Joi.string().required(),
    createdByName: Joi.string().required(),
    isCompleted: Joi.boolean().required(),
    isDeleted: Joi.boolean().required(),
    assignees: Joi.object()
      .pattern(Joi.string().trim(), Joi.string().trim())
      .unknown(true)
      .required(),
    children: Joi.array().items(dbChildNodeSchema).optional(),
  })
  .unknown(false) as unknown as Joi.ObjectSchema<AppKanbanEntities>;
