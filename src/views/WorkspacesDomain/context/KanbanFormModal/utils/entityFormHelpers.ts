import DOMPurify from 'dompurify';
import { EntityType, FormMode } from '../constants/constants';
import type { KanbanEntities } from '../types/types';

/**
 * Resolves initial form values based on context, URL parameters, and entity relational rules.
 */
export const resolveInitialValues = (
  mode: FormMode,
  entityType: EntityType,
  initialData?: Partial<KanbanEntities>,
  boardId?: string,
  columnId?: string,
  availableColumns: Record<string, string> = {}
): Partial<KanbanEntities> => {
  let initialParent = initialData?.parent || null;
  let initialGrand = initialData?.grand || null;

  if (mode === FormMode.CREATE) {
    if (entityType === EntityType.COLUMN) {
      initialParent = initialParent || boardId || null;
    } else if (entityType === EntityType.TASK) {
      initialParent = initialParent || columnId || null;

      if (!initialGrand) {
        const hasSelectedColumn =
          initialParent !== null && initialParent in availableColumns;

        if (hasSelectedColumn && boardId) {
          initialGrand = boardId;
        } else {
          initialGrand = null;
        }
      }
    }
  }

  return {
    uid: initialData?.uid || '',
    title: initialData?.title || '',
    description: initialData?.description || '',
    createdBy: initialData?.createdBy || '',
    createdByName: initialData?.createdByName || '',
    isCompleted: initialData?.isCompleted || false,
    isDeleted: initialData?.isDeleted || false,
    assignees: initialData?.assignees || {},
    parent: initialParent,
    grand: initialGrand,
  };
};

/**
 * Sanitizes input and strictly shapes the final submission payload according to entity architectural limits.
 */
export const buildSubmissionPayload = (
  rawData: KanbanEntities,
  mode: FormMode,
  entityType: EntityType,
  uid: string,
  operatorName: string,
  initialData?: Partial<KanbanEntities>
): KanbanEntities => {
  const basePayload: KanbanEntities = {
    ...rawData,
    title: DOMPurify.sanitize(rawData.title.trim()),
    description: DOMPurify.sanitize(rawData.description.trim()),
    isCompleted: false,
    isDeleted: false,
    createdBy: mode === FormMode.CREATE ? uid : (initialData?.createdBy ?? uid),
    createdByName:
      mode === FormMode.CREATE
        ? operatorName
        : (initialData?.createdByName ?? operatorName),
  };

  if (entityType === EntityType.BOARD) {
    delete basePayload.parent;
    delete basePayload.grand;
  } else if (entityType === EntityType.COLUMN) {
    basePayload.parent = basePayload.parent || null;
    delete basePayload.grand;
  } else if (entityType === EntityType.TASK) {
    basePayload.parent = basePayload.parent || null;
    basePayload.grand = basePayload.grand || null;
  }

  return basePayload;
};
