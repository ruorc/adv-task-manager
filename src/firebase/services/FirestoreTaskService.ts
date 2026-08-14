import { sysLogger } from '@/utils/logger';
import { appKanbanEntitiesSchema } from '@/schemas/appKanbanSchema';
import { hasKanbanFormChanges } from '@/utils/kanbanEntityComparator';
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
   * Connects the logging diagnostics context designated for monitoring isolated task states.
   */
  constructor() {
    const loggerInstance = sysLogger.forModule('FirestoreTaskService');

    super(loggerInstance);
  }

  /**
   * Checks if the incoming task form payload contains changes compared to the database snapshot.
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
   * Appends default lifecycle indicators ensuring new or edited tasks are active and not closed.
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
   * Retrieves tasks directly assigned to a specific column parent.
   * Evaluates parent node coordinates and filters out records containing
   * positive soft-deleted tracking attributes automatically through the base engine.
   */
  public async getTasksByColumn(
    columnUid: string
  ): Promise<AppKanbanEntities[]> {
    return this.getMany({
      filters: {
        parent: columnUid,
      },
    });
  }

  /**
   * Retrieves all tasks belonging to an entire board workspace using the top-level grand ancestor reference.
   * Sweeps the structural workspace hierarchy and filters out records containing
   * positive soft-deleted tracking attributes automatically through the base engine.
   */
  public async getTasksByBoard(boardUid: string): Promise<AppKanbanEntities[]> {
    return this.getMany({
      filters: {
        grand: boardUid,
      },
    });
  }

  /**
   * Retrieves a single verified task entity structure by its unique identifier.
   * Requests the record node matching the identity string and returns the hydrated instance
   * containing layout tuple configurations or null when no records match the criteria.
   */
  public async getTask(uid: string): Promise<AppKanbanEntities | null> {
    return this.getById(uid);
  }

  /**
   * Generates a unique identifier in the database, validates the structural blueprint,
   * and persists the new task entity, returning the created document with its generated uid.
   * Captures the raw untrusted components payload and returns the fully validated mapped target.
   */
  public async createTask(
    rawTaskData: KanbanCreatePayload
  ): Promise<AppKanbanEntities | undefined> {
    return this.create(rawTaskData);
  }

  /**
   * Updates specific fields of an existing task document in the database layer.
   * Automatically isolates mutations preventing changes to the immutable primary key property.
   * Targets database coordinates via the identity string and executes a partial state mutation map.
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
   * Requires a valid target key identity along with operational strategy deletion configurations.
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
