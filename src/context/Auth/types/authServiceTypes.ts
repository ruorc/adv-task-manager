import type { AppUser } from '@/context/User';

/**
 * Universal contract for any authentication service within the application.
 * Ensures that the UI layer and providers remain independent of specific implementations.
 */
export interface AuthService {
  /**
   * Triggers the user logout process.
   */
  logout(): Promise<void>;

  /**
   * Subscribes the calling context to reactive changes in the user session and profile.
   * Returns an unsubscribe function to clean up the listener.
   */
  subscribeToAuthChanges(
    onUserChanged: (user: AppUser | null) => void
  ): () => void;
}
