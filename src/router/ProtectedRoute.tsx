import { type ComponentType, type JSX } from 'react';

/**
 * Properties required to configure the session-based conditional route switcher.
 */
interface ProtectedRouteProps {
  /** Evaluation flag specifying if the current user possesses a verified session state. */
  readonly isUserAuthenticated: boolean;
  /** Component rendered exclusively when the user session evaluation resolves to true. */
  readonly ActiveViewComponent: ComponentType<Record<string, unknown>>;
  /** Fallback component rendered when an unauthenticated guest attempts to access a restricted path. */
  readonly GuestWallComponent: ComponentType<Record<string, unknown>>;
}

/**
 * Authorization guard component isolating core business layers from authentication checking pipelines.
 * Conditionally mounts target views or fallback screens depending on user session states.
 */
export const ProtectedRoute = ({
  isUserAuthenticated,
  ActiveViewComponent,
  GuestWallComponent,
}: ProtectedRouteProps): JSX.Element => {
  return isUserAuthenticated ? <ActiveViewComponent /> : <GuestWallComponent />;
};
