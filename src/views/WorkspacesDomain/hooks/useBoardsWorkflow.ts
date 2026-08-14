import { useQuery } from '@tanstack/react-query';
import { getBoardsQueryConfig } from '@/utils/loader';

import type { AppKanbanEntities } from '@/types/appKanbanTypes';
import type { BoardFilterModeType, BoardItem } from '../types/workspaceTypes';

/**
 * Custom hook managing the state of board collections with client-side filter projections.
 * Enforces strict presence of the user identifier to protect data boundaries.
 */
export const useBoardsWorkflow = (
  userUid: string,
  filterMode: BoardFilterModeType = 'ALL'
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

      return filtered
        .filter((board) => Boolean(board.uid && board.title))
        .map((board) => ({
          uid: board.uid!,
          title: board.title!,
        })) as readonly BoardItem[];
    },
  });
};
