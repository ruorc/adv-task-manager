import type {
  AppUser,
  LoginPayload,
  RegistrationPayload,
} from '@/types/appUserTypes';
import type { UserCredential } from 'firebase/auth';

/**
 * Universal business contract for any authentication service implementation
 * within the application domain layer.
 */
export interface AuthService {
  /** Logs in a user using their credentials. */
  login(
    /** The user credentials required for login. */
    credentials: LoginPayload
  ): Promise<UserCredential>;

  /** Registers a new user with the provided data. */
  register(
    /** The registration payload containing user details. */
    registrationData: RegistrationPayload
  ): Promise<UserCredential>;

  /** Logs out the current user session. */
  logout(): Promise<void>;

  /** Listens to real-time authentication state updates. */
  subscribeToAuthChanges(
    /** Callback triggered whenever the user state changes. */
    onUserChanged: (
      /** The active user object or null if logged out. */
      user: AppUser | null
    ) => void
  ): () => void;
}
