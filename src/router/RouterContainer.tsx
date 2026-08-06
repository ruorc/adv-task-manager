import { useMemo, type JSX, type ReactNode } from 'react';
import { NavLink, Outlet } from 'react-router';

import { Layout } from '@/layout/Layout';
import { ROUTES } from '@/routes';
import type { NavigationRegistry } from '@/types/navigation';

/**
 * Common layout parameter state schema passed into active navigation elements.
 */
interface LinkStateProps {
  /** Reactive status flag confirming if the active URL path exactly matches this endpoint */
  readonly isActive: boolean;
}

/**
 * Structural communication contract specifying expected parameters for link presentation wrappers.
 */
interface RouterLinkProps {
  /** Explicit render prop function transferring internal routing conditions down to presenters */
  readonly children: (
    /** Contextual snapshot parameter tracking real-time client routing state positions */
    props: LinkStateProps
  ) => ReactNode;
}

/**
 * Higher-order utility factory generating standardized client-side NavLink render wrappers
 * bound strictly to concrete application destination URL paths.
 */
const createLinkComponent = (to: string) => {
  return ({ children }: RouterLinkProps): JSX.Element => (
    <NavLink to={to}>{(props: LinkStateProps) => children(props)}</NavLink>
  );
};

/**
 * Internal reactive routing lifecycle container running strictly inside the Router context.
 * Coordinates global application navigation registries and structural layout framing.
 */
export const RouterContainer = (): JSX.Element => {
  const globalNavigationRegistry = useMemo<NavigationRegistry>(
    () => ({
      /** Injected route factory link bound strictly to the application root pathway for logo controls */
      rootLink: createLinkComponent(ROUTES.ABOUT),
      /** Complete immutable collection containing abstract navigation configurations for the main menu */
      links: [
        {
          id: 'about',
          label: 'About',
          LinkComponent: createLinkComponent(ROUTES.ABOUT),
        },
        {
          id: 'workspaces',
          label: 'Workspaces',
          LinkComponent: createLinkComponent(ROUTES.WORKSPACES),
        },
      ],
    }),
    []
  );

  return (
    <Layout navigationRegistry={globalNavigationRegistry}>
      <Outlet />
    </Layout>
  );
};
