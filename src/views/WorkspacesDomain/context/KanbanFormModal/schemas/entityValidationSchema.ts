import Joi from 'joi';

import { kanbanFieldsValidation } from './kanbanFieldsValidation';

import type { ReadonlyKanbanForm } from '../types/kanbanTypes';

/**
 * Dynamic Joi validation schema for entities, enforcing conditional rules based on the active form layout context.
 */
export const entityValidationSchema = Joi.object<ReadonlyKanbanForm>({
  title: kanbanFieldsValidation.title,
  description: kanbanFieldsValidation.description,
  assignees: kanbanFieldsValidation.assignees,
  createdBy: kanbanFieldsValidation.createdBy,
  createdByName: kanbanFieldsValidation.createdByName,
  isCompleted: kanbanFieldsValidation.isCompleted,
  isDeleted: kanbanFieldsValidation.isDeleted,
  parent: kanbanFieldsValidation.parent,
  grand: kanbanFieldsValidation.grand,
  uid: Joi.string().optional(),
}).presence('required');
