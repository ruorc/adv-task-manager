/**
 * Unified structural blueprint representing data models
 * across the Kanban board core storage system.
 */
export interface AppKanbanEntities {
  /** The unique identity key value for the specific entity. */
  readonly uid: string;
  /** The primary header display text title of the entity. */
  readonly title: string;
  /** Detailed content summary or functional explanation text of the entity. */
  readonly description: string;
  /** The system user ID identifier of the original creator. */
  readonly createdBy: string;
  /** Cached human display username of the profile that created the entity. */
  readonly createdByName: string;
  /** Key-value mapped collection record tracking active assigned team users. */
  readonly assignees: Record<string, string>;
  /** Indicates whether the final task lifecycle or project workflow is closed. */
  readonly isCompleted: boolean;
  /** Soft-deletion toggle flag indicating if the record is currently archived. */
  readonly isDeleted: boolean;
  /** Optional link parameter referencing the immediate ancestor node element ID. */
  readonly parent?: string | null;
  /** Optional ultimate layout link referencing the top-level roots entry ID. */
  readonly grand?: string | null;
}

/**
 * Payload arguments required to initialize and store
 * a new Kanban entity instance inside the remote database.
 */
export type KanbanCreatePayload = Omit<AppKanbanEntities, 'uid'>;
