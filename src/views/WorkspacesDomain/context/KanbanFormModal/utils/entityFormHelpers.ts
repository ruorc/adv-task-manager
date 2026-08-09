import DOMPurify from 'dompurify';

import { EntityName, FormMode } from '../constants/constants';
import type {
  AppKanbanEntities,
  KanbanCreatePayload,
} from '@/types/appKanbanTypes';
import type {
  EntityType,
  FormModeType,
  ReadonlyKanbanForm,
} from '../types/kanbanTypes';

/**
 * Resolves initial form values based on context, URL parameters,
 * and entity relational rules.
 */
export const resolveInitialValues = (
  /** The operational workflow stage layout type. */
  mode: FormModeType,
  /** The target model type category being processed. */
  entityType: EntityType,
  /** Optional baseline configurations or partial data fields. */
  initialData: ReadonlyKanbanForm | undefined,
  /** Dynamic context routing key referencing the current board viewport. */
  boardId: string | undefined,
  /** Dynamic context routing key referencing the current column container. */
  columnId: string | undefined,
  /** Key-value catalog mapping active board columns to identities. */
  availableColumns: Record<string, string> = {}
): ReadonlyKanbanForm => {
  let initialParent = initialData?.parent || null;
  let initialGrand = initialData?.grand || null;

  if (mode === FormMode.CREATE) {
    if (entityType === EntityName.COLUMN) {
      initialParent = initialParent || boardId || null;
    } else if (entityType === EntityName.TASK) {
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
    uid: initialData?.uid || undefined,
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
 * Sanitizes input and strictly shapes the final submission payload
 * according to entity architectural limits.
 */
export const buildSubmissionPayload = (
  /** The raw unverified dataset captured directly from form inputs. */
  rawData: ReadonlyKanbanForm,
  /** The operational workflow stage layout type. */
  mode: FormModeType,
  /** The target model type category being processed. */
  entityType: EntityType,
  /** The unique identification token of the active session operator. */
  operatorUid: string,
  /** The user profile name assigned to the dispatching entity. */
  operatorName: string,
  /** Optional original baseline object for verifying untouched properties. */
  initialData?: ReadonlyKanbanForm
): AppKanbanEntities | KanbanCreatePayload | null => {
  const sanitizedTitle = DOMPurify.sanitize(rawData.title.trim());
  const sanitizedDescription = DOMPurify.sanitize(rawData.description.trim());

  if (!sanitizedTitle) {
    throw new Error(
      'Validation failure: Title is strictly required and cannot be empty.'
    );
  }

  if (mode === FormMode.EDIT) {
    if (
      !initialData ||
      !initialData.uid ||
      !initialData.createdBy ||
      !initialData.createdByName ||
      initialData.isCompleted === undefined ||
      initialData.isDeleted === undefined
    ) {
      throw new Error(
        'Validation failure: Database initial state is incomplete or corrupt in EDIT mode. Submission blocked.'
      );
    }

    const isTitleChanged = sanitizedTitle !== (initialData.title || '').trim();
    const isDescriptionChanged =
      sanitizedDescription !== (initialData.description || '').trim();
    const isParentChanged =
      (rawData.parent || null) !== (initialData.parent || null);
    const isGrandChanged =
      (rawData.grand || null) !== (initialData.grand || null);

    const rawAssigneesKeys = Object.keys(rawData.assignees || {});
    const initialAssigneesKeys = Object.keys(initialData.assignees || {});
    const isAssigneesChanged =
      rawAssigneesKeys.length !== initialAssigneesKeys.length ||
      !rawAssigneesKeys.every(
        (key) => rawData.assignees[key] === initialData.assignees[key]
      );

    const hasAnyChanges =
      isTitleChanged ||
      isDescriptionChanged ||
      isParentChanged ||
      isGrandChanged ||
      isAssigneesChanged;

    if (!hasAnyChanges) {
      return null;
    }
  }

  let finalCreatedBy = '';
  let finalCreatedByName = '';
  let finalUid: string | undefined = undefined;

  if (mode === FormMode.CREATE) {
    if (!operatorUid.trim() || !operatorName.trim()) {
      throw new Error(
        'Validation failure: Active session configuration is invalid. Cannot resolve creator identity.'
      );
    }

    finalCreatedBy = operatorUid.trim();
    finalCreatedByName = operatorName.trim();
  } else if (initialData) {
    finalUid = initialData.uid;
    finalCreatedBy = initialData.createdBy;
    finalCreatedByName = initialData.createdByName;
  }

  const basePayload = {
    ...rawData,
    uid: finalUid,
    title: sanitizedTitle,
    description: sanitizedDescription,
    createdBy: finalCreatedBy,
    createdByName: finalCreatedByName,
    isCompleted: false,
    isDeleted: false,
  } as Record<string, unknown>;

  if (entityType === EntityName.BOARD) {
    delete basePayload.parent;
    delete basePayload.grand;
  } else if (entityType === EntityName.COLUMN) {
    basePayload.parent = basePayload.parent || null;
    delete basePayload.grand;
  } else if (entityType === EntityName.TASK) {
    basePayload.parent = basePayload.parent || null;
    basePayload.grand = basePayload.grand || null;
  }

  if (mode === FormMode.EDIT) {
    return basePayload as unknown as AppKanbanEntities;
  }

  delete basePayload.uid;

  return basePayload as unknown as KanbanCreatePayload;
};
