import { sysLogger } from '@/utils/logger';
import { appKanbanEntitiesSchema } from '@/schemas/appKanbanSchema';
import { BaseFirestoreService } from './BaseFirestoreService';

import type {
  AppKanbanEntities,
  KanbanCreatePayload,
} from '@/types/appKanbanTypes';

/**
 * Singleton instance manager coordinating database persistence,
 * runtime schema validation, and hierarchy queries for board columns.
 */
export class FirestoreColumnService extends BaseFirestoreService<AppKanbanEntities> {
  /** Root database collection target configuration for column documents. */
  protected collectionName = 'columns';

  /** Active runtime evaluation validation blueprints backing column structures. */
  protected schema = appKanbanEntitiesSchema;

  /**
   * Initializes the column service instance and binds the infrastructure telemetry pipeline.
   */
  constructor() {
    const loggerInstance = sysLogger.forModule('FirestoreColumnService');

    super(loggerInstance);
  }

  /**
   * Retrieves a single verified column entity structure by its unique identifier.
   * Returns the hydrated instance or null when no records match the criteria.
   */
  public async getColumn(uid: string): Promise<AppKanbanEntities | null> {
    return this.getById(uid);
  }

  /**
   * Retrieves all operational columns nested inside a target parent board.
   * Filters out soft-deleted structures automatically.
   */
  public async getColumnsByBoard(
    boardUid: string
  ): Promise<AppKanbanEntities[]> {
    return this.getMany({
      filters: {
        parent: boardUid,
        isDeleted: false,
      },
    });
  }

  /**
   * Generates a unique identifier in the database, validates the structural blueprint,
   * and persists the new column entity, returning the created document with its generated uid.
   */
  public async createColumn(
    rawColumnData: KanbanCreatePayload
  ): Promise<AppKanbanEntities> {
    return this.create(rawColumnData);
  }

  /**
   * Updates specific fields of an existing column document in the database layer.
   * Automatically isolates mutations preventing changes to the immutable primary key property.
   */
  public async updateColumn(
    uid: string,
    updates: Partial<KanbanCreatePayload>
  ): Promise<void> {
    return this.update(uid, updates);
  }

  /**
   * Disposes of a column structure identified by its primary key identifier.
   * Applies a soft delete flag state by default unless the hard delete constraint options flag is set.
   */
  public async deleteColumn(
    uid: string,
    options: { hardDelete?: boolean } = {}
  ): Promise<void> {
    return this.delete(uid, options);
  }
}

/**
 * Singleton instance of the Firestore column persistence service.
 */
export const firestoreColumnService = new FirestoreColumnService();
