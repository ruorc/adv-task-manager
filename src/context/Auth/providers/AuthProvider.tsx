import {
  useEffect,
  useState,
  useMemo,
  type JSX,
  type ReactNode,
  useCallback,
} from 'react';

import { AuthContext } from '../context/AuthContext';

import type { AppUser } from '@/types/appUserTypes';
import type { AuthService } from '@/context/Auth/types/authServiceTypes';
import type { AuthContextProps } from '../types/authContextTypes';

/**
 * Configuration properties for the generic authentication provider component.
 */
interface GenericAuthProviderProps {
  /** Concrete implementation of the authentication contract used for session management. */
  readonly authService: AuthService;
  /** React node hierarchy that requires access to the authentication state context. */
  readonly children: ReactNode;
}

/**
 * Centralized context provider that distributes authentication state and session workflows across the application.
 * Utilizes dependency injection to decouple client components from vendor-specific infrastructure APIs.
 */
export const GenericAuthProvider = ({
  authService,
  children,
}: GenericAuthProviderProps): JSX.Element => {
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [appUser, setAppUser] = useState<AppUser | null>(null);

  useEffect(() => {
    const unsubscribe = authService.subscribeToAuthChanges((user) => {
      setAppUser(user);
      setIsInitializing(false);
    });

    return () => {
      unsubscribe();
    };
  }, [authService]);

  const executeLogoutSequence = useCallback(async (): Promise<void> => {
    try {
      await authService.logout();
    } catch {
      // Error handling and logging are delegated to the low-level service implementation.
    }
  }, [authService]);

  const contextValue = useMemo<AuthContextProps>(
    () => ({
      isAuthenticated: Boolean(appUser),
      isInitializing,
      operatorName: appUser ? appUser.displayName : null,
      uid: appUser ? appUser.uid : null,
      user: appUser,
      executeLogoutSequence,
    }),
    [appUser, isInitializing, executeLogoutSequence]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
