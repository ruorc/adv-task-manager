import { sysLogger } from '@/utils/logger';
import { appUserSchema } from '@/schemas/appUserSchema';
import { BaseFirestoreService } from './BaseFirestoreService';

import type { AppUser } from '@/types/appUserTypes';

/**
 * Singleton instance manager coordinating database persistence,
 * runtime schema validation, and safe profile document retrieval for application users.
 */
export class FirestoreUserService extends BaseFirestoreService<AppUser> {
  /** Root database collection target configuration for user profiles. */
  protected collectionName = 'users';

  /** Active runtime evaluation validation blueprints backing user structures. */
  protected schema = appUserSchema;

  /**
   * Initializes the user service instance and binds the infrastructure telemetry pipeline.
   */
  constructor() {
    const loggerInstance = sysLogger.forModule('FirestoreUserService');

    super(loggerInstance);
  }

  /**
   * Validates raw user data payloads and persists them into the root storage layer.
   * Strictly requires a predefined identifier mapping from Firebase Authentication state.
   */
  public async saveUserProfile(rawUserData: unknown): Promise<AppUser> {
    const dataWrapper = rawUserData as Record<string, unknown> | null;
    const providedUid = dataWrapper?.uid ? String(dataWrapper.uid) : undefined;

    return this.save(rawUserData, providedUid);
  }

  /**
   * Retrieves a verified, structures app user profile identified by a unique domain credential.
   * Returns the hydrated instance or null when no records match the criteria.
   */
  public async getUserProfile(uid: string): Promise<AppUser | null> {
    return this.getById(uid);
  }

  /**
   * Retrieves all verified user profiles from the system collection.
   */
  public async getAllUsers(): Promise<AppUser[]> {
    return this.getMany({});
  }

  /**
   * Updates specific fields of an existing user profile document inside the database layer.
   * Automatically isolates mutations preventing changes to the immutable primary key property.
   */
  public async updateUserProfile(
    uid: string,
    updates: Partial<Omit<AppUser, 'uid'>>
  ): Promise<void> {
    return this.update(uid, updates);
  }

  /**
   * Permanently purges a user profile document from the root database layer.
   * This operation executes a hard delete and cannot be undone.
   */
  public async deleteUserProfile(uid: string): Promise<void> {
    return this.delete(uid, { hardDelete: true });
  }
}

/**
 * Singleton instance of the Firestore user persistence service.
 */
export const firestoreUserService = new FirestoreUserService();
