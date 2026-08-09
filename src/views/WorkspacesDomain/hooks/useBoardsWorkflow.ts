import { useQuery } from '@tanstack/react-query';
import { getBoardsQueryConfig } from '@/utils/loader';

import type { AppKanbanEntities } from '@/types/appKanbanTypes';
import type { BoardFilterMode } from '../types/workspaceTypes';

/**
 * Custom hook managing the state of board collections with client-side filter projections.
 */
export const useBoardsWorkflow = (
  userUid: string | undefined,
  filterMode: BoardFilterMode = 'ALL',
  userAccessibleColumnIds: string[] = []
) => {
  const baseConfig = getBoardsQueryConfig(userUid || 'fallback');

  return useQuery({
    ...baseConfig,
    enabled: !!userUid,
    select: (boardsArray: AppKanbanEntities[]) => {
      const filtered = boardsArray.filter((b) => {
        if (filterMode === 'MY_BOARDS') {
          return b.createdBy === userUid;
        }

        if (filterMode === 'SHARED_ACCESS') {
          return (
            b.createdBy === userUid || userAccessibleColumnIds.includes(b.uid)
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
