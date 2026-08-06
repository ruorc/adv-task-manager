import { Suspense, useMemo, type JSX } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router';

import { PageLoader } from '@/components/UI/PageLoader';
import { useAuth } from '@/context/Auth';
import { getRouterConfig } from './routerConfig';

/**
 * Centralized global micro-frontend application infrastructure router orchestrator.
 * Delegates node routing tree compiles directly to the specialized router config module.
 */
export const AppRouter = (): JSX.Element => {
  const { isInitializing, isAuthenticated } = useAuth();

  const browserRouterInstance = useMemo(() => {
    return createBrowserRouter([
      ...getRouterConfig(isAuthenticated),
    ] as RouteObject[]);
  }, [isAuthenticated]);

  if (isInitializing) {
    return <PageLoader />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={browserRouterInstance} />
    </Suspense>
  );
};
