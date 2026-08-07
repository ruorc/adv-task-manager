import { useQuery } from '@tanstack/react-query';

import { firestoreUserService } from '@/firebase/services/FirestoreUserService';

/**
 * Custom hook fetching the complete system user list and mapping it into a stable text dictionary.
 */
export const useAllUsers = (currentOperatorUid: string | null | undefined) => {
  return useQuery({
    queryKey: ['users', 'global-list', currentOperatorUid],

    queryFn: async () => {
      const usersArray = await firestoreUserService.getAllUsers();

      /** Map the source array into a clean key-value lookup record using verified fields */
      return usersArray.reduce<Record<string, string>>((acc, user) => {
        const userUid = user.uid;
        const name = user.displayName;

        /**
         * Strictly enforce that both attributes exist prior to committing entries.
         * Additionally, exclude the currently logged-in operator session profile from the registry.
         */
        if (userUid && name && userUid !== currentOperatorUid) {
          acc[userUid] = name;
        }

        return acc;
      }, {});
    },

    enabled: currentOperatorUid !== null && currentOperatorUid !== undefined,

    /** Maintain active directory memory records across route instances to optimize resource threads */
    staleTime: 5 * 60 * 1000,
  });
};
