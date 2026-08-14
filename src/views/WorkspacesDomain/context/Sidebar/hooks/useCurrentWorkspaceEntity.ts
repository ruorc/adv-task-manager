import { useMemo } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getBoardsQueryConfig } from '@/utils/loader';
import type { AppKanbanEntities } from '@/types/appKanbanTypes';

/**
 * Core entity model properties combined with runtime container metadata.
 */
interface ActiveWorkspaceEntity extends AppKanbanEntities {
  /** Evaluation flag specifying that the entity layout block contains genuine persistent data. */
  readonly isEmpty: false;
}

/**
 * Represents the structured entity model successfully resolved from the application cache state.
 */
export type WorkspaceEntityResult = ActiveWorkspaceEntity | null;

/**
 * Defines the structural data layer returned by the workspace entity resolution engine.
 */
interface UseWorkspaceEntityReturn {
  /** The fully populated workspace model extracted from the persistent cache layer, or null. */
  readonly currentEntity: WorkspaceEntityResult;
  /** Evaluates to true if the authenticated operator matches the creation signature of the active resource. */
  readonly isOwner: boolean;
  /** The active unique entity identifier harvested based on current parameter priority. */
  readonly activeId: string | undefined;
}

/**
 * Custom React hook that resolves the current workflow focus (Board, Column, or Task)
 * by prioritizing hierarchical routing parameters and warming up local layout context.
 *
 * It abstracts cache access rules away from view layers by consolidating multi-stage
 * fallback evaluations into a single query lifecycle.
 */
export const useCurrentWorkspaceEntity = (
  uid: string
): UseWorkspaceEntityReturn => {
  const { boardId, columnId, taskId } = useParams<{
    readonly boardId?: string;
    readonly columnId?: string;
    readonly taskId?: string;
  }>();

  const activeId = taskId || columnId || boardId;

  const baseConfig = getBoardsQueryConfig(uid);
  const { data: cachedBoards } = useQuery<AppKanbanEntities[]>({
    ...baseConfig,
    enabled: Boolean(uid && activeId),
  });

  const currentEntity = useMemo<WorkspaceEntityResult>(() => {
    if (!activeId || !cachedBoards) {
      return null;
    }

    const foundEntity = cachedBoards.find((entity) => entity.uid === activeId);

    if (!foundEntity) {
      return null;
    }

    return {
      ...foundEntity,
      isEmpty: false,
    };
  }, [activeId, cachedBoards]);

  const isOwner = Boolean(currentEntity && currentEntity.createdBy === uid);

  return {
    currentEntity,
    isOwner,
    activeId,
  };
};
