import Joi from 'joi';

import { entityValidationSchema } from '@/views/WorkspacesDomain/context/KanbanFormModal';

/**
 * Extended Joi validation schema enforcing payload constraints for finalized backend transmission.
 */
export const finalPayloadValidationSchema = entityValidationSchema.append({
  uid: Joi.string().required(),
  createdBy: Joi.string().required(),
  createdByName: Joi.string().required(),
  isCompleted: Joi.boolean().required(),
  isDeleted: Joi.boolean().required(),
});
