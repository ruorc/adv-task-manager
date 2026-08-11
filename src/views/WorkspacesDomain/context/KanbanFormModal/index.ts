import { UniversalEntityModal } from './UI/UniversalEntityModal';
import { EntityName, FormMode } from './constants/constants';
import { entityValidationSchema } from './schemas/entityValidationSchema';

import type { EntityType, FormModeType } from './types/kanbanTypes';

export {
  /** Core string literal registry defining valid structural component classification types. */
  EntityName,
  /** Configuration collection mapping system layout state behaviors. */
  FormMode,
  /** Main visual component serving as the interface entry point. */
  UniversalEntityModal,
  /** Core Joi validation schema enforcing entity business rules and integrity boundaries. */
  entityValidationSchema,
};

export type {
  /** Structural identification categorization boundaries applied to board objects. */
  EntityType,
  /** Operational phase state flags restricting modal rendering paths. */
  FormModeType,
};
