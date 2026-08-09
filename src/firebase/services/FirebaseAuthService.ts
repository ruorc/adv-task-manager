import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  deleteUser,
  onAuthStateChanged,
  type UserCredential,
} from 'firebase/auth';

import { auth } from '@/firebase/config';
import { sysLogger } from '@/utils/logger';
import { FIREBASE_AUTH_ERRORS } from '../constants/firebaseConstants';
import { firestoreUserService } from './FirestoreUserService';

import type { AuthService } from '@/context/Auth';
import type {
  AppUser,
  LoginPayload,
  RegistrationPayload,
} from '@/types/appUserTypes';

const logger = sysLogger.forModule('FirebaseAuthService');

/**
 * Firebase-backed implementation of the authentication service managing user sessions,
 * credential validation, registration rollbacks, and real-time profile state synchronization.
 */
export class FirebaseAuthService implements AuthService {
  /**
   * Authenticates an existing user using email and password credentials.
   */
  public async login(credentials: LoginPayload): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(
        auth,
        credentials.email.trim(),
        credentials.password
      );
    } catch (error) {
      logger.error(
        'Native firebase client SDK login processing failure',
        error
      );

      throw this.handleAuthError(error);
    }
  }
  /**
   * Registers a new user account, enforces strict non-empty first and last names,
   * constructs the display name strictly as the combination of first and last names,
   * provisions a synchronized profile document in Firestore, and rolls back on failure.
   */
  public async register(
    registrationData: Required<RegistrationPayload>
  ): Promise<UserCredential> {
    const email = registrationData.email.trim();
    const firstName = registrationData.firstName.trim();
    const lastName = registrationData.lastName.trim();
    const displayName = `${firstName} ${lastName}`;

    let userCredential: UserCredential | null = null;

    try {
      userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        registrationData.password
      );

      const newUser: AppUser = {
        uid: userCredential.user.uid,
        email: userCredential.user.email ?? email,
        firstName,
        lastName,
        displayName,
        role: 'user',
      };

      await firestoreUserService.saveUserProfile(newUser);

      return userCredential;
    } catch (error) {
      logger.error(
        'Native firebase client SDK register and sync rejected',
        error
      );

      if (userCredential?.user) {
        try {
          await deleteUser(userCredential.user);
        } catch (cleanupError) {
          logger.error(
            'Failed to roll back Auth user after Firestore failure',
            cleanupError
          );
        }
      }

      throw this.handleAuthError(error);
    }
  }

  /**
   * Terminates the active user session securely.
   */
  public async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      logger.error(
        'Native firebase client SDK explicit session termination failed',
        error
      );

      throw this.handleAuthError(error);
    }
  }

  /**
   * Establishes a real-time subscription to authentication state changes
   * and synchronizes the active user profile stream from Firestore.
   */
  public subscribeToAuthChanges(
    onUserChanged: (user: AppUser | null) => void
  ): () => void {
    let unsubscribeFromFirestore: (() => void) | null = null;

    const unsubscribeFromAuth = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        if (unsubscribeFromFirestore) {
          unsubscribeFromFirestore();
          unsubscribeFromFirestore = null;
        }

        if (!firebaseUser) {
          onUserChanged(null);

          return;
        }

        try {
          const userProfile = await firestoreUserService.getUserProfile(
            firebaseUser.uid
          );

          if (userProfile) {
            onUserChanged(userProfile);
          } else {
            onUserChanged(null);
          }
        } catch (error) {
          logger.error(
            `Service framework failed to sync database profile for [${firebaseUser.uid}]`,
            error
          );

          onUserChanged(null);
        }
      }
    );

    return () => {
      unsubscribeFromAuth();

      if (unsubscribeFromFirestore) {
        unsubscribeFromFirestore();
      }
    };
  }

  /**
   * Maps raw Firebase authentication errors to clean application exceptions.
   */
  private handleAuthError(error: unknown): Error {
    const nativeError = error as Error & { readonly code?: string };

    if (!nativeError.code) {
      return new Error('An unexpected authentication error occurred.', {
        cause: error,
      });
    }

    switch (nativeError.code) {
      case FIREBASE_AUTH_ERRORS.EMAIL_IN_USE:
        return new Error(
          'The provided email address is already in use by another account.',
          {
            cause: error,
          }
        );
      case FIREBASE_AUTH_ERRORS.INVALID_CREDENTIALS:
        return new Error('Invalid email or password credentials provided.', {
          cause: error,
        });
      default:
        return new Error('An unexpected authentication error occurred.', {
          cause: error,
        });
    }
  }
}

/**
 * Singleton instance of the Firebase authentication service.
 */
export const firebaseAuthService = new FirebaseAuthService();
