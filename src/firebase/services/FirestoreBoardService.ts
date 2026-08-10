import { sysLogger } from '@/utils/logger';
import { appKanbanEntitiesSchema } from '@/schemas/appKanbanSchema';
import { BaseFirestoreService } from './BaseFirestoreService';

import type {
  AppKanbanEntities,
  KanbanCreatePayload,
} from '@/types/appKanbanTypes';

/**
 * Singleton instance manager coordinating database persistence,
 * runtime schema validation, and operational queries for Kanban boards.
 */
export class FirestoreBoardService extends BaseFirestoreService<AppKanbanEntities> {
  /** Root database collection target configuration for board documents. */
  protected collectionName = 'boards';

  /** Active runtime evaluation validation blueprints backing board structures. */
  protected schema = appKanbanEntitiesSchema;

  /**
   * Initializes the board service instance and binds the infrastructure telemetry pipeline.
   */
  constructor() {
    const loggerInstance = sysLogger.forModule('FirestoreBoardService');

    super(loggerInstance);
  }

  /**
   * Retrieves a single verified board entity structure by its unique identifier.
   * Returns the hydrated instance or null when no records match the criteria.
   */
  public async getBoardProfile(uid: string): Promise<AppKanbanEntities | null> {
    return this.getById(uid);
  }

  /**
   * Retrieves all active boards globally available within the application context.
   * Excludes records marked with soft deletion state attributes.
   */
  public async getAllActiveBoards(): Promise<AppKanbanEntities[]> {
    return this.getMany({
      filters: {
        isDeleted: false,
      },
    });
  }

  /**
   * Generates a unique identifier in the database, validates the structural blueprint,
   * and persists the new board entity, returning the created document with its generated uid.
   */
  public async createBoard(
    rawBoardData: KanbanCreatePayload
  ): Promise<AppKanbanEntities> {
    return this.create(rawBoardData);
  }

  /**
   * Updates specific fields of an existing board document in the database layer.
   * Automatically isolates mutations preventing changes to the immutable primary key property.
   */
  public async updateBoard(
    uid: string,
    updates: Partial<KanbanCreatePayload>
  ): Promise<void> {
    return this.update(uid, updates);
  }

  /**
   * Disposes of a board structure identified by its primary key identifier.
   * Applies a soft delete flag state by default unless the hard delete constraint options flag is set.
   */
  public async deleteBoard(
    uid: string,
    options: { hardDelete?: boolean } = {}
  ): Promise<void> {
    return this.delete(uid, options);
  }
}

/**
 * Singleton instance of the Firestore board persistence service.
 */
export const firestoreBoardService = new FirestoreBoardService();
