import { useQuery } from '@tanstack/react-query';
import { getBoardsQueryConfig } from '@/utils/loader';
import type { KanbanEntities } from '../context/KanbanFormModal';

export type BoardFilterMode = 'ALL' | 'MY_BOARDS' | 'SHARED_ACCESS';

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
    // Spread the queryKey and queryFn from the shared config file
    ...baseConfig,
    enabled: !!userUid,
    select: (boardsArray: KanbanEntities[]) => {
      let filtered = boardsArray;

      if (filterMode === 'MY_BOARDS') {
        filtered = boardsArray.filter((b) => b.createdBy === userUid);
      } else if (filterMode === 'SHARED_ACCESS') {
        filtered = boardsArray.filter(
          (b) =>
            b.createdBy === userUid || userAccessibleColumnIds.includes(b.uid)
        );
      }

      return filtered.reduce<Record<string, string>>((acc, board) => {
        if (board.uid && board.title) {
          acc[board.uid] = board.title;
        }

        return acc;
      }, {});
    },
  });
};
