import { useAuth } from './useAuth';

import type { AppUser } from '@/types/appUserTypes';

/**
 * Structural blueprint ensuring strictly populated identity profiles inside authenticated layout zones.
 */
interface SecureAuthContextProps {
  /** Hardcoded confirmation layout state proving the client is currently logged in. */
  readonly isAuthenticated: true;
  /** Initialization status indicator proving the metadata loading sequence has finished. */
  readonly isInitializing: false;
  /** The unique core system identification sequence belonging to the current user. */
  readonly uid: string;
  /** The formal corporate identifier designation assigned to the active session owner. */
  readonly operatorName: string;
  /** Full profile parameter envelope containing synchronized user account configurations. */
  readonly user: AppUser;
  /** Execution callback wrapper managing the secure destruction of local session keys. */
  readonly executeLogoutSequence: () => Promise<void>;
}

/** Explicit structural validation barrier enforcing complete presence of identity data records without fallback states. */
export const useRequiredAuth = (): SecureAuthContextProps => {
  const context = useAuth();

  if (!context.uid || !context.user || !context.operatorName) {
    throw new Error(
      'Security Violation: useRequiredAuth invoked outside an authenticated router guard boundary.'
    );
  }

  return context as unknown as SecureAuthContextProps;
};
