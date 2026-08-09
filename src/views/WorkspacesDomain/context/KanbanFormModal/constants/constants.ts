/**
 * A read-only object mapping application entity types.
 */
export const EntityName = {
  BOARD: 'board',
  COLUMN: 'column',
  TASK: 'task',
} as const;

/**
 * A read-only object mapping form operational modes.
 */
export const FormMode = {
  CREATE: 'create',
  EDIT: 'edit',
} as const;

/**
 * A read-only object mapping database and interface field identifiers for entities.
 */
export const EntityField = {
  UID: 'uid',
  TITLE: 'title',
  DESCRIPTION: 'description',
  CREATED_BY: 'createdBy',
  ASSIGNEES: 'assignees',
  PARENT: 'parent',
  GRAND: 'grand',
} as const;

/**
 * Extracted union type representing valid application entity categories.
 */
export type EntityType = (typeof EntityName)[keyof typeof EntityName];

/**
 * Extracted union type representing available form states.
 */
export type FormModeType = (typeof FormMode)[keyof typeof FormMode];

/**
 * A read-only dictionary providing standardized static UI localization text strings.
 */
export const UI_TEXT = {
  BUTTON_CANCEL: 'Cancel',
  BUTTON_CREATE: 'Create',
  BUTTON_SAVE: 'Save Changes',
  LABEL_TITLE: 'Title',
  LABEL_DESCRIPTION: 'Description',
  LABEL_CREATED_BY: 'Created By',
  LABEL_ASSIGNEES: 'Assignees',
  LABEL_TARGET_BOARD: 'Target Board',
  LABEL_TARGET_COLUMN: 'Target Column',
  TITLE_PREFIX_CREATE: 'Create New',
  TITLE_PREFIX_EDIT: 'Edit',
} as const;
