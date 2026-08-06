import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  type QueryDocumentSnapshot,
  type FirestoreDataConverter,
} from 'firebase/firestore';

import { db } from '@/firebase/config';
import { sysLogger } from '@/utils/logger';
import { appUserSchema } from '@/context/User';

import type { AppUser } from '@/context/User';

const logger = sysLogger.forModule('FirestoreUserService');

/**
 * Strongly typed Firestore converter enforcing runtime Joi validation checks
 * and guaranteeing structural domain integrity upon document retrieval.
 */
const userConverter: FirestoreDataConverter<AppUser> = {
  toFirestore(user: AppUser) {
    return user;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): AppUser {
    const rawData = snapshot.data();

    const { error, value } = appUserSchema.validate(rawData, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorMessages = error.details
        .map((detail) => detail.message)
        .join(', ');

      logger.error(
        `Corrupted user document structure detected in database for [${snapshot.id}]: ${errorMessages}`,
        new Error(errorMessages)
      );

      throw new Error(
        `Invalid user document structure in database: ${errorMessages}`
      );
    }

    return value as AppUser;
  },
};

/**
 * Manages database persistence, runtime schema validation,
 * and document retrieval operations for user profiles in Firestore.
 */
export class FirestoreUserService {
  /**
   * Validates and persists a user profile document into the Firestore users collection.
   */
  public async saveUserProfile(rawUserData: unknown): Promise<AppUser> {
    const { error, value } = appUserSchema.validate(rawUserData, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorMessages = error.details
        .map((detail) => detail.message)
        .join(', ');

      logger.error(
        'Validation failed before writing user profile to Firestore',
        new Error(errorMessages)
      );

      throw new Error(`Invalid user payload structure: ${errorMessages}`);
    }

    const validatedUser = value as AppUser;
    const userDocRef = doc(db, 'users', validatedUser.uid).withConverter(
      userConverter
    );

    try {
      await setDoc(userDocRef, validatedUser);

      return validatedUser;
    } catch (firestoreError) {
      logger.error(
        'Failed to persist user profile document in Firestore',
        firestoreError
      );

      throw firestoreError;
    }
  }

  /**
   * Retrieves and validates a user profile document by its unique identifier.
   */
  public async getUserProfile(uid: string): Promise<AppUser | null> {
    const userDocRef = doc(db, 'users', uid).withConverter(userConverter);

    try {
      const snapshot = await getDoc(userDocRef);

      if (!snapshot.exists()) {
        return null;
      }

      return snapshot.data();
    } catch (error) {
      logger.error(
        `Failed to retrieve user profile document for identifier [${uid}]`,
        error
      );

      throw error;
    }
  }

  /**
   * Updates specific fields of an existing user profile document in Firestore.
   */
  public async updateUserProfile(
    uid: string,
    updates: Partial<Omit<AppUser, 'uid'>>
  ): Promise<void> {
    const userDocRef = doc(db, 'users', uid);

    try {
      await updateDoc(userDocRef, updates);
    } catch (error) {
      logger.error(
        `Failed to update user profile document for identifier [${uid}]`,
        error
      );

      throw error;
    }
  }
}

/**
 * Singleton instance of the Firestore user persistence service.
 */
export const firestoreUserService = new FirestoreUserService();
