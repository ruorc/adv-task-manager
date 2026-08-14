/**
 * Immutable dictionary providing standardized static UI localization text strings and confirmation templates.
 */
export const UI_TEXTS = Object.freeze({
  HEADER: 'Workspaces',
  SEARCH: 'Search / Filter',
  NEW_BOARD: 'New Board',
  NEW_COLUMN: 'New Column',
  NEW_TASK: 'New Task',
  EDIT: 'Edit',
  DELETE: 'Delete',
  SAVE_SUCCESS: 'Successfully saved!',
  DELETE_SUCCESS: 'Successfully deleted.',
  DELETE_ERROR_NOT_EMPTY:
    'Cannot delete this entity because it contains nested items.',
  CONFIRM_DELETE_TITLE: 'Confirm Deletion',
  CONFIRM_DELETE_DESC: (title: string) =>
    `Are you sure you want to delete "${title}"? This action cannot be undone.`,
  CONFIRM_BTN: 'Delete',
  CANCEL_BTN: 'Cancel',
  FALLBACK_ENTITY_TITLE: 'Current Entity',
});
