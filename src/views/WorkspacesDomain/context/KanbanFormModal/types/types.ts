import { type UseFormReturn } from 'react-hook-form';

import { EntityType, FormMode } from '../constants/constants';

/**
 * Represents a user profile within the application.
 */
export interface User {
  /** Unique identifier for the user. */
  uid: string;
  /** The display name of the user. */
  name: string;
}

/**
 * Data structure representing a board configuration or its related nested entity.
 */
export interface KanbanEntities {
  /** Unique identifier for the entity. */
  uid: string;
  /** Title or name of the entity. */
  title: string;
  /** Detailed explanation of the entity purpose or content. */
  description: string;
  /** User identifier of the entity creator. */
  createdBy: string;
  /** Display name of the entity creator for fast UI rendering without additional user lookups. */
  createdByName: string;
  /** List of user identifiers assigned to this entity. */
  assignees: Record<string, string>;
  /** Flag indicating whether the operational workflow status of the entity is marked as completed. */
  isCompleted: boolean;
  /** Flag indicating soft deletion state for archived or discarded entities. */
  isDeleted: boolean;
  /** Optional reference to the immediate parent entity identifier. */
  parent?: string | null;
  /** Optional reference to the top-level ancestor entity identifier. */
  grand?: string | null;
}

/**
 * Shared properties core to both the modal component boundaries and its internal state management context.
 */
interface BaseEntityModalSharedProps {
  /** The operational state of the form, managing creation or modification. */
  mode: FormMode;
  /** The target architectural classification of the entity being processed. */
  entityType: EntityType;
  /** Dictionary mapping user identifiers to their respective human-readable names for assignment roles. */
  availableUsers: Record<string, string>;
  /** Dictionary mapping board identifiers to their display titles for selection or relational binding. */
  availableBoards: Record<string, string>;
  /** Dictionary mapping column identifiers to their display titles for selection or relational binding. */
  availableColumns: Record<string, string>;
  /** Callback dispatcher invoked to close the open dialog window interface safely. */
  onClose: () => void;
}

/**
 * Properties for the UniversalEntityModal  component.
 */
export interface UniversalEntityModalProps extends BaseEntityModalSharedProps {
  /** Controls the visibility state of the modal dialog. */
  isOpen: boolean;
  /** Callback trigger invoked upon successful submission of the entity data form. */
  onSubmit: (data: KanbanEntities) => void;
  /** Optional baseline values used to populate fields on component initialization. */
  initialData?: Partial<KanbanEntities>;
}

/**
 * Shared state context value managing initialization and behavior configurations for the entity modal workflow.
 */
export interface ModalContextValue extends BaseEntityModalSharedProps {
  /** Internal react-hook-form management methods and state boundaries for the board entity fields. */
  formMethods: UseFormReturn<KanbanEntities>;
  /** Action dispatcher triggered when formatting and submitting valid data fields. */
  handleSubmitForm: (data: KanbanEntities) => void;
}
