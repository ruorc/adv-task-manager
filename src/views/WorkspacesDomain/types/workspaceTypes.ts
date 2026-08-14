import type { AppKanbanEntities } from '@/types/appKanbanTypes';
import type { BoardFilterModeType } from '../constants/constants';

/**
 * Extracted union type representing valid application entity categories.
 */
export type { BoardFilterModeType };

/**
 * Metadata extension flags required specifically for the workspace presentation layer.
 */
interface WorkspaceMetadata {
  /** Indicates that the resolved active board, column, or task is populated and valid. */
  readonly isEmpty: false;
}

/**
 * Represents the resolved active entity state enriched with frontend metadata flags.
 */
export type WorkspaceEntityResult =
  (AppKanbanEntities & WorkspaceMetadata) | null;

/**
 * Defines the structured state properties returned by the workspace evaluation hook.
 */
export interface UseWorkspaceEntityReturn {
  /** The active board, column, or task data object retrieved from the local cache. */
  readonly currentEntity: WorkspaceEntityResult;
  /** Flag confirming whether the current authenticated operator owns this specific entity. */
  readonly isOwner: boolean;
  /** The raw entity string identifier captured from the current routing route params. */
  readonly activeId: string | undefined;
}

/**
 * Type construction extracting dictionary records into strict key-value sequence pairs.
 */
export interface BoardItem {
  /** The targeted unique core database key mapping to the dashboard structure. */
  readonly uid: string;
  /** The visual description identifier assigned to the target data board. */
  readonly title: string;
}
