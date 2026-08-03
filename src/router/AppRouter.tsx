import {
  Suspense,
  useCallback,
  useMemo,
  type JSX,
  type ReactNode,
} from 'react';
import {
  createBrowserRouter,
  Navigate,
  NavLink,
  Outlet,
  RouterProvider,
  useLocation,
} from 'react-router';

import { PageLoader } from '@/components/UI/PageLoader';
import { useAuth } from '@/context/Auth';
import { Layout } from '@/layout/Layout';
import { ROUTES } from '@/routes';
import { ProtectedRoute } from './ProtectedRoute';

import type { NavigationRegistry } from '@/types/navigation';

/**
 * Contextual state payload passed down to active navigation link renderers.
 */
interface NavLinkStateProps {
  /** Indicates whether the current link destination matches the active route pathway */
  readonly isActive: boolean;
}

/**
 * Structural communication contract for internal navigation link wrapper elements.
 */
interface NavLinkWrapperProps {
  /** Target routing destination URI path string */
  readonly to: string;
  /** Render prop function providing active state context to children */
  readonly children: (props: NavLinkStateProps) => ReactNode;
}

const NavLinkWrapper = ({ to, children }: NavLinkWrapperProps): JSX.Element => (
  <NavLink to={to}>{children}</NavLink>
);

/**
 * Structural communication contract for navigation link rendering factories.
 */
interface NavigationLinkProps {
  /** Render prop callback providing child element layout and active state flags */
  readonly children: (props: NavLinkStateProps) => ReactNode;
}

/**
 * Internal reactive routing lifecycle container.
 * Safely executes under the RouterProvider tree context to drive dynamic navigation registries.
 */
const RouterContainer = (): JSX.Element => {
  const location = useLocation();

  const renderAboutLink = useCallback(
    ({ children }: NavigationLinkProps): JSX.Element => (
      <NavLinkWrapper to={ROUTES.ABOUT}>{children}</NavLinkWrapper>
    ),
    []
  );

  const renderWorkspacesLink = useCallback(
    ({ children }: NavigationLinkProps): JSX.Element => (
      <NavLinkWrapper to={ROUTES.WORKSPACES}>{children}</NavLinkWrapper>
    ),
    []
  );

  const renderRootLink = useCallback(
    ({ children }: NavigationLinkProps): JSX.Element => {
      const isAboutActive = location.pathname === ROUTES.ABOUT;
      const isRootActive = location.pathname === ROUTES.ROOT;
      const isMuted = isRootActive || isAboutActive;

      if (isMuted) {
        return <>{children({ isActive: true })}</>;
      }

      return (
        <NavLink to={ROUTES.ROOT} style={{ textDecoration: 'none' }}>
          {() => children({ isActive: false })}
        </NavLink>
      );
    },
    [location.pathname]
  );

  const globalNavigationRegistry = useMemo<NavigationRegistry>(
    () => ({
      rootLink: renderRootLink,
      links: [
        { id: 'about', label: 'About', LinkComponent: renderAboutLink },
        {
          id: 'workspaces',
          label: 'Workspaces',
          LinkComponent: renderWorkspacesLink,
        },
      ],
    }),
    [renderRootLink, renderAboutLink, renderWorkspacesLink]
  );

  return (
    <Layout navigationRegistry={globalNavigationRegistry}>
      <Outlet />
    </Layout>
  );
};

/**
 * Centralized global micro-frontend application infrastructure router orchestrator.
 * Eliminates custom React.lazy/Suspense wrappers in favor of native React Router v7 lazy chunk resolution.
 */
export const AppRouter = (): JSX.Element => {
  const { isInitializing, isAuthenticated } = useAuth();

  const browserRouterInstance = useMemo(() => {
    return createBrowserRouter([
      {
        HydrateFallback: PageLoader,
        element: <RouterContainer />,
        children: [
          {
            path: ROUTES.ROOT,
            element: <Navigate to={ROUTES.ABOUT} replace />,
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
              const [{ WorkspacesPage }, { AuthWallPage }] = await Promise.all([
                import('@/views/WorkspacesPage/WorkspacesPage'),
                import('@/views/WorkspacesPage/AuthWallPage'),
              ]);

              return {
                Component: function WorkspacesRouteBoundary() {
                  return (
                    <ProtectedRoute
                      isUserAuthenticated={isAuthenticated}
                      ActiveViewComponent={WorkspacesPage}
                      GuestWallComponent={AuthWallPage}
                    />
                  );
                },
              };
            },
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
    ]);
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
