import { type ComponentType } from 'react';
import { type RouteObject } from 'react-router';

import { PageLoader } from '@/components/UI/PageLoader';
import { ROUTES } from '@/routes';
import { ProtectedRoute } from './ProtectedRoute';
import { RouterContainer } from './RouterContainer';

/**
 * Higher-order utility generating functional boundaries for guarded layouts.
 */
const createProtectedRouteComponent = (
  isAuthenticated: boolean,
  ActiveComponent: ComponentType,
  GuestComponent: ComponentType
) => {
  return function ProtectedRouteBoundary() {
    return (
      <ProtectedRoute
        isUserAuthenticated={isAuthenticated}
        ActiveViewComponent={ActiveComponent}
        GuestWallComponent={GuestComponent}
      />
    );
  };
};

/**
 * Generates the unified, static application routing hierarchy configuration.
 * Sets up lazy-loaded view paths, global providers, fallback view loaders, and access control wrappers.
 */
export const getRouterConfig = (
  isAuthenticated: boolean
): readonly RouteObject[] => [
  {
    HydrateFallback: PageLoader,
    element: <RouterContainer />,
    children: [
      {
        path: ROUTES.ROOT,
        lazy: async () => {
          const { Navigate } = await import('react-router');

          return { Component: () => <Navigate to={ROUTES.ABOUT} replace /> };
        },
      },
      {
        path: ROUTES.ABOUT,
        lazy: async () => {
          const { AboutPage } = await import('@/views/AboutPage/AboutPage');

          return { Component: AboutPage };
        },
      },
      {
        path: ROUTES.WORKSPACES,
        lazy: async () => {
          const { WorkspacesLayout } =
            await import('@/views/WorkspacesDomain/WorkspacesLayout');
          const { AuthWallPage } =
            await import('@/views/WorkspacesDomain/AuthWallPage');

          return {
            Component: createProtectedRouteComponent(
              isAuthenticated,
              WorkspacesLayout,
              AuthWallPage
            ),
          };
        },
        children: [
          {
            index: true,
            lazy: async () => {
              const { WorkspacesPage } =
                await import('@/views/WorkspacesDomain/WorkspacesPage/WorkspacesPage');

              return { Component: WorkspacesPage };
            },
          },
          {
            path: ROUTES.BOARD_DETAIL,
            lazy: async () => {
              const { BoardDetailPage } =
                await import('@/views/WorkspacesDomain/BoardDetailPage');

              return { Component: BoardDetailPage };
            },
          },
          {
            path: ROUTES.COLUMN_DETAIL,
            lazy: async () => {
              const { ColumnDetailPage } =
                await import('@/views/WorkspacesDomain/ColumnDetailPage');

              return { Component: ColumnDetailPage };
            },
          },
          {
            path: ROUTES.TASK_DETAIL,
            lazy: async () => {
              const { TaskDetailPage } =
                await import('@/views/WorkspacesDomain/TaskDetailPage');

              return { Component: TaskDetailPage };
            },
          },
        ],
      },
      {
        path: ROUTES.NOT_FOUND,
        lazy: async () => {
          const { NotFoundPage } = await import('@/views/NotFoundPage');

          return { Component: NotFoundPage };
        },
      },
    ],
  },
];
