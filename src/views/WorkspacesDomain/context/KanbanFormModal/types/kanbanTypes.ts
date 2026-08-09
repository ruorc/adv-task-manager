import { type UseFormReturn } from 'react-hook-form';

import type { AppUser } from '@/types/appUserTypes';
import type {
  AppKanbanEntities,
  KanbanCreatePayload,
} from '@/types/appKanbanTypes';
import type { EntityType, FormModeType } from '../constants/constants';

/**
 * Extracted union type representing valid application entity categories.
 */
export type { EntityType };

/**
 * Extracted union type representing available form states.
 */
export type { FormModeType };

/**
 * Represents a simplified user profile within the application context.
 */
export type User = Pick<AppUser, 'uid' | 'displayName'>;

/**
 * Unified functional contract for processing Kanban entity form mutations
 * across variable payload structures.
 */
type EntitySubmitAction = {
  /** Submits the full entity object including unique identifier coordinates. */
  (
    /** The complete existing Kanban entity instance profile. */
    data: AppKanbanEntities
  ): void;
  /** Submits the creation payload data omitting structural identifier fields. */
  (
    /** The newly constructed Kanban data footprint payload. */
    data: KanbanCreatePayload
  ): void;
};

/**
 * Structural configuration data properties required to initialize
 * any Kanban management modal viewport.
 */
interface BaseEntityModalSharedProps {
  /** The current active operational stage layout state. */
  readonly mode: FormModeType;
  /** The target model type category being processed. */
  readonly entityType: EntityType;
  /** Key-value roster of registered team member records. */
  readonly availableUsers: Record<string, string>;
  /** Key-value directory listing active board node locations. */
  readonly availableBoards: Record<string, string>;
  /** Key-value directory listing active column index paths. */
  readonly availableColumns: Record<string, string>;
}

/**
 * Action dispatchers strictly managing data submission
 * and processing behavior within the form layer.
 */
interface BaseEntityFormActionProps {
  /** Executed when data boundaries pass schema parsing. */
  readonly onSubmit: EntitySubmitAction;
}

/**
 * Infrastructure action properties managing the window runtime lifecycle
 * and explicit destructive actions.
 */
interface BaseEntityModalActionProps {
  /** Triggers the safe disposal of the active dialog box. */
  readonly onClose: () => void;
  /** Dispatches an archival workflow processing the chosen card identifier. */
  readonly onDelete?: (
    /** The system entry tracking key being removed. */
    uid: string
  ) => Promise<void>;
}

/**
 * Client-side form input layout model matching creation parameters
 * with an optional record identity for updating current states.
 */
export interface ReadonlyKanbanForm extends KanbanCreatePayload {
  /** The specific identity key included exclusively during item update procedures. */
  readonly uid?: AppKanbanEntities['uid'];
}

/**
 * Universal layout and orchestration configuration blueprint
 * controlling top-level dialog wrapper scopes.
 */
export interface UniversalEntityModalProps
  extends
    BaseEntityModalSharedProps,
    BaseEntityFormActionProps,
    BaseEntityModalActionProps {
  /** Toggles the visible rendering boundary state. */
  readonly isOpen: boolean;
  /** Baseline fallback configuration metrics populating the fields. */
  readonly initialData?: ReadonlyKanbanForm;
}

/**
 * Shared state context value broadcasting internal management hooks
 * alongside core behavioral rules.
 */
export interface ModalContextValue
  extends BaseEntityModalSharedProps, BaseEntityModalActionProps {
  /** Reactive form handlers binding fields to the schema layout. */
  readonly formMethods: UseFormReturn<ReadonlyKanbanForm>;
  /** Action dispatcher triggered when formatting and submitting valid data fields. */
  readonly handleSubmitForm: EntitySubmitAction;
}

/**
 * Specialized validation shape representing mutable form inputs where
 * relation metrics are collected into basic string arrays.
 */
export interface KanbanFormState extends Omit<ReadonlyKanbanForm, 'assignees'> {
  /** Roster tracking target unique identification keys of selected team workers. */
  readonly assignees: string[];
}
