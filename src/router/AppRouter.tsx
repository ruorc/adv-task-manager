import { Suspense, useMemo, type JSX } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router';

import { PageLoader } from '@/components/UI/PageLoader';
import { useAuth } from '@/context/Auth';
import { queryClient } from '@/utils/queryClient';
import { getRouterConfig } from './routerConfig';

/**
 * Centralized global micro-frontend application infrastructure router orchestrator.
 * Delegates node routing tree compiles directly to the specialized router config module.
 */
export const AppRouter = (): JSX.Element => {
  const { isInitializing, isAuthenticated, user } = useAuth();

  const browserRouterInstance = useMemo(() => {
    /** Establish a stable functional accessor to extract user identities inside route loader passes */
    const getCurrentUserUid = () => user?.uid;

    return createBrowserRouter([
      ...getRouterConfig(isAuthenticated, queryClient, getCurrentUserUid),
    ] as RouteObject[]);
  }, [isAuthenticated, user?.uid]);

  if (isInitializing) {
    return <PageLoader />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={browserRouterInstance} />
    </Suspense>
  );
};
