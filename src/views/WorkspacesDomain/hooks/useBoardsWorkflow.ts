import { useQuery } from '@tanstack/react-query';
import { getBoardsQueryConfig } from '@/utils/loader';

import type { AppKanbanEntities } from '@/types/appKanbanTypes';
import type { BoardFilterMode } from '../types/workspaceTypes';

/**
 * Custom hook managing the state of board collections with client-side filter projections.
 * Enforces strict presence of the user identifier to protect data boundaries.
 */
export const useBoardsWorkflow = (
  userUid: string,
  filterMode: BoardFilterMode = 'ALL'
) => {
  const baseConfig = getBoardsQueryConfig(userUid);

  return useQuery({
    ...baseConfig,
    enabled: true,
    select: (boardsArray: AppKanbanEntities[]) => {
      const filtered = boardsArray.filter((b) => {
        if (filterMode === 'MY_BOARDS') {
          return b.createdBy === userUid;
        }

        if (filterMode === 'SHARED_ACCESS') {
          return (
            b.createdBy !== userUid && b.assignees && userUid in b.assignees
          );
        }

        return true;
      });

      return filtered.reduce<Record<string, string>>((acc, board) => {
        if (board.uid && board.title) {
          acc[board.uid] = board.title;
        }

        return acc;
      }, {});
    },
  });
};
