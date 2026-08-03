import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  type UserCredential,
} from 'firebase/auth';

import { auth } from '@/firebase/config';
import { sysLogger } from '@/utils/logger';

import type { ReadonlyAuthForm } from '@/context/AuthModal/types/authFormTypes';

/**
 * Dedicated Firebase Client SDK Identity and Access Control Service.
 * Orchestrates direct web-socket and transport operations through official modular libraries.
 */
export class FirebaseAuthService {
  /**
   * Authenticates an operator using direct cloud credential validation channels.
   */
  public async login(credentials: ReadonlyAuthForm): Promise<UserCredential> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email.trim(),
        credentials.password
      );

      return userCredential;
    } catch (error) {
      sysLogger.error(
        'Native firebase client SDK login processing failure',
        error
      );

      throw error;
    }
  }

  /**
   * Establishes a new cloud user profile and appends structural metadata mapping to display metrics.
   */
  public async register(
    registrationData: ReadonlyAuthForm
  ): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registrationData.email.trim(),
        registrationData.password
      );

      const fullOperatorName = `${registrationData.firstName!.trim()} ${registrationData.lastName!.trim()}`;

      await updateProfile(userCredential.user, {
        displayName: fullOperatorName,
      });

      return userCredential;
    } catch (error) {
      sysLogger.error(
        'Native firebase client SDK profile creation rejected',
        error
      );

      throw error;
    }
  }

  /**
   * Terminates the active secure session and dispatches state resets.
   */
  public async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      sysLogger.error(
        'Native firebase client SDK explicit session termination failed',
        error
      );

      throw error;
    }
  }
}

/** Centralized single-instance operation orchestrator binding native firebase authorization */
export const firebaseAuthService = new FirebaseAuthService();
