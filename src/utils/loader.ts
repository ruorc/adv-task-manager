import { type LoaderFunction } from 'react-router';
import { type QueryClient } from '@tanstack/react-query';

import { firestoreBoardService } from '@/firebase/services/FirestoreBoardService';

/**
 * Creates a unique query key configuration sequence for global board collections.
 */
export const getBoardsQueryConfig = (userUid: string) => ({
  queryKey: ['boards', 'raw-list', userUid],
  queryFn: () => firestoreBoardService.getAllActiveBoards(),
});

/**
 * Router loader function designed to prefetch active boards into the query cache boundary.
 */
export const workspacesDomainLoader = (
  queryClient: QueryClient,
  getCurrentUserUid: () => string | undefined
): LoaderFunction => {
  return async () => {
    const userUid = getCurrentUserUid();

    if (!userUid) {
      return null;
    }

    const config = getBoardsQueryConfig(userUid);

    /** Ensure data is prefetched and cached before page component layout mounts */
    await queryClient.ensureQueryData(config);

    return null;
  };
};
