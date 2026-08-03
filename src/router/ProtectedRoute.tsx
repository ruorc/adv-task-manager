import { type ComponentType, type JSX } from 'react';

/**
 * Technical synchronization payload contract for structural route access control filters.
 */
export interface ProtectedRouteProps {
  /** Cryptographic flag confirming whether the client session holds authenticated credentials */
  readonly isUserAuthenticated: boolean;
  /** Primary operational destination target component instantiated upon successful authorization */
  readonly ActiveViewComponent: ComponentType;
  /** Alternate guest fallback layout injected cleanly directly onto the target route destination block */
  readonly GuestWallComponent: ComponentType;
}

/**
 * Deterministic authorization wall operating strictly on the route layer boundaries.
 * Isolates business view pages from session checking routines by intercepting active view graphs.
 */
export const ProtectedRoute = ({
  isUserAuthenticated,
  ActiveViewComponent,
  GuestWallComponent,
}: ProtectedRouteProps): JSX.Element => {
  return isUserAuthenticated ? <ActiveViewComponent /> : <GuestWallComponent />;
};
