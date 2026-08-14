import Joi from 'joi';

import { kanbanFieldsValidation } from './kanbanFieldsValidation';
import type { ReadonlyKanbanForm } from '../types/kanbanTypes';

/**
 * Client-side Joi validation schema tailored strictly for user interaction inputs.
 * Enforces boundary rules only on fields directly manageable by the form modal layout components.
 * Bypasses strict errors for unmapped system attributes via unknown flag.
 */
export const entityValidationSchema = Joi.object<ReadonlyKanbanForm>({
  title: kanbanFieldsValidation.title.required(),
  description: kanbanFieldsValidation.description.optional(),
  assignees: kanbanFieldsValidation.assignees.default([]),
  parent: kanbanFieldsValidation.parent.optional(),
  grand: kanbanFieldsValidation.grand.optional(),
}).unknown(true);
