import type { AppUser } from '@/types/appUserTypes';
/**
 * Reactive data parameters representing the current operator session
 * and authentication status flags.
 */
export interface AuthContextState {
  /** Stateful indicator checking if a valid secure connection credentials record exists. */
  readonly isAuthenticated: boolean;
  /** Reactive status flag holding application startup network processing states. */
  readonly isInitializing: boolean;
  /** Explicit verification operator full display name or null for guests. */
  readonly operatorName: string | null;
  /** Unique operator identification code assigned to the persistent cloud account node. */
  readonly uid: string | null;
  /** Direct access blueprint mapping internal native client instances. */
  readonly user: AppUser | null;
}

/**
 * Action dispatchers and operational workflows exposed
 * by the authentication stream.
 */
export interface AuthContextActions {
  /** Dispatches an explicit request to clean cloud token registries and close active sessions. */
  readonly executeLogoutSequence: () => Promise<void>;
}

/**
 * Unified functional contract specifying credentials tokens
 * exposed by the authentication context tree.
 */
export interface AuthContextProps
  extends AuthContextState, AuthContextActions {}
