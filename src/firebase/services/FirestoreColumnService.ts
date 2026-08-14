import { sysLogger } from '@/utils/logger';
import { appKanbanEntitiesSchema } from '@/schemas/appKanbanSchema';
import { BaseFirestoreService } from './BaseFirestoreService';
import { hasKanbanFormChanges } from '@/utils/kanbanEntityComparator';

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
   * Extracts specific tracking components designated for column lifecycle streams.
   */
  constructor() {
    const loggerInstance = sysLogger.forModule('FirestoreColumnService');

    super(loggerInstance);
  }

  /**
   * Checks if the incoming column form payload contains changes compared to the database snapshot.
   * Delegates the comparison process to the specialized pure Kanban entity comparator utility.
   */
  protected hasChanges(
    current: AppKanbanEntities,
    incoming: Partial<AppKanbanEntities>
  ): boolean {
    return hasKanbanFormChanges(current, incoming);
  }

  /**
   * Enforces Kanban domain-specific default flags and layout resets upon database mutations.
   * Appends default lifecycle indicators ensuring new or edited columns are active and not closed.
   */
  protected enforceDefaultFlags(
    payload: Partial<AppKanbanEntities>
  ): Partial<AppKanbanEntities> {
    return {
      ...payload,
      isCompleted: false,
      isDeleted: false,
    };
  }

  /**
   * Retrieves a single verified column entity structure by its unique identifier.
   * Requests the record node matching the identity string and returns the hydrated instance
   * containing layout tuple configurations or null when no records match the criteria.
   */
  public async getColumn(uid: string): Promise<AppKanbanEntities | null> {
    return this.getById(uid);
  }

  /**
   * Retrieves all operational columns nested inside a target parent board.
   * Evaluates parent coordinate mappings and automatically filters out tracking nodes
   * containing positive soft-deleted structure attributes through the base service engine.
   */
  public async getColumnsByBoard(
    boardUid: string
  ): Promise<AppKanbanEntities[]> {
    return this.getMany({
      filters: {
        parent: boardUid,
      },
    });
  }

  /**
   * Generates a unique identifier in the database, validates the structural blueprint,
   * and persists the new column entity, returning the created document with its generated uid.
   * Processes the initial unsaved column layout data block and emits the converted target instance.
   */
  public async createColumn(
    rawColumnData: KanbanCreatePayload
  ): Promise<AppKanbanEntities | undefined> {
    return this.create(rawColumnData);
  }

  /**
   * Updates specific fields of an existing column document in the database layer.
   * Automatically isolates mutations preventing changes to the immutable primary key property.
   * Matches storage coordinates via the identity string and applies a partial update data map.
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
   * Requires a targeted record pointer string alongside granular removal operation flags.
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
