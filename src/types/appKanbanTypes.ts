/**
 * Auxiliary representation of a nested sub-task or related downstream element.
 * Encapsulates minimal display and identity properties required for tree-view visualization.
 */
export interface KanbanChildNode {
  /** The unique identity key value for the specific child entity. */
  readonly id: string;
  /** The primary header display text title of the child entity. */
  readonly title: string;
  /** Detailed content summary or functional explanation text of the child entity. */
  readonly description: string;
}

/**
 * Unified structural blueprint representing data models across the Kanban board core storage system.
 * Tailored directly for frontend presentation layers, tracking active assigned team users
 * as an iterable array of identity tuples.
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
  /** Presentation-friendly multi-selection sequence tracking active assigned team users. */
  readonly assignees: readonly [string, string][];
  /** Indicates whether the final task lifecycle or project workflow is closed. */
  readonly isCompleted: boolean;
  /** Soft-deletion toggle flag indicating if the record is currently archived. */
  readonly isDeleted: boolean;
  /** Optional link parameter referencing the immediate ancestor node element ID. */
  readonly parent?: string | null;
  /** Optional ultimate layout link referencing the top-level roots entry ID. */
  readonly grand?: string | null;
  /** Optional hierarchical collection tracking immediate nested child nodes linked underneath this scope. */
  readonly children?: readonly KanbanChildNode[];
}

/**
 * Server-side representation of the Kanban entity inside the Firestore database.
 * Reconfigures the baseline presentation tuple array layout back into a dictionary record map.
 */
export type ServerKanbanEntities = Omit<AppKanbanEntities, 'assignees'> & {
  /**
   * The structural database tracking configuration storing verified connections.
   * Maps individual team user identities to their active presentation display names.
   */
  readonly assignees: Record<string, string>;
};

/**
 * Payload arguments required to initialize and store a new Kanban entity instance inside the remote database.
 * Client-side creation hooks use this signature by omitting structural identifier fields,
 * keeping assignees formatted as an array of identity tuples.
 */
export type KanbanCreatePayload = Omit<AppKanbanEntities, 'uid'>;
