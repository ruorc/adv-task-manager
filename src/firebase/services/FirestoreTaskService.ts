import { sysLogger } from '@/utils/logger';
import { appKanbanEntitiesSchema } from '@/schemas/appKanbanSchema';
import { BaseFirestoreService } from './BaseFirestoreService';

import type {
  AppKanbanEntities,
  KanbanCreatePayload,
} from '@/types/appKanbanTypes';

/**
 * Singleton instance manager coordinating database persistence,
 * runtime schema validation, and multi-level ancestor queries for task items.
 */
export class FirestoreTaskService extends BaseFirestoreService<AppKanbanEntities> {
  /** Root database collection target configuration for task documents. */
  protected collectionName = 'tasks';

  /** Active runtime evaluation validation blueprints backing task structures. */
  protected schema = appKanbanEntitiesSchema;

  /**
   * Initializes the task service instance and binds the infrastructure telemetry pipeline.
   */
  constructor() {
    const loggerInstance = sysLogger.forModule('FirestoreTaskService');

    super(loggerInstance);
  }

  /**
   * Retrieves tasks directly assigned to a specific column parent.
   * Filters out soft-deleted records automatically.
   */
  public async getTasksByColumn(
    columnUid: string
  ): Promise<AppKanbanEntities[]> {
    return this.getMany({
      filters: {
        parent: columnUid,
        isDeleted: false,
      },
    });
  }

  /**
   * Retrieves all tasks belonging to an entire board workspace using the top-level grand ancestor reference.
   * Filters out soft-deleted records automatically.
   */
  public async getTasksByBoard(boardUid: string): Promise<AppKanbanEntities[]> {
    return this.getMany({
      filters: {
        grand: boardUid,
        isDeleted: false,
      },
    });
  }

  /**
   * Retrieves a single verified task entity structure by its unique identifier.
   * Returns the hydrated instance or null when no records match the criteria.
   */
  public async getTask(uid: string): Promise<AppKanbanEntities | null> {
    return this.getById(uid);
  }

  /**
   * Generates a unique identifier in the database, validates the structural blueprint,
   * and persists the new task entity, returning the created document with its generated uid.
   */
  public async createTask(
    rawTaskData: KanbanCreatePayload
  ): Promise<AppKanbanEntities> {
    return this.create(rawTaskData);
  }

  /**
   * Updates specific fields of an existing task document in the database layer.
   * Automatically isolates mutations preventing changes to the immutable primary key property.
   */
  public async updateTask(
    uid: string,
    updates: Partial<KanbanCreatePayload>
  ): Promise<void> {
    return this.update(uid, updates);
  }

  /**
   * Disposes of a task structure identified by its primary key identifier.
   * Applies a soft delete flag state by default unless the hard delete constraint options flag is set.
   */
  public async deleteTask(
    uid: string,
    options: { hardDelete?: boolean } = {}
  ): Promise<void> {
    return this.delete(uid, options);
  }
}

/**
 * Singleton instance of the Firestore task persistence service.
 */
export const firestoreTaskService = new FirestoreTaskService();
