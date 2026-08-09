import DOMPurify from 'dompurify';

import { EntityName, FormMode } from '../constants/constants';

import type {
  AppKanbanEntities,
  KanbanCreatePayload,
} from '@/types/appKanbanTypes';
import type {
  EntityType,
  FormModeType,
  KanbanFormState,
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
): KanbanFormState => {
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

  const initialAssigneesKeys = initialData?.assignees
    ? Object.keys(initialData.assignees)
    : [];

  return {
    uid: initialData?.uid || undefined,
    title: initialData?.title || '',
    description: initialData?.description || '',
    createdBy: initialData?.createdBy || '',
    createdByName: initialData?.createdByName || '',
    isCompleted: initialData?.isCompleted || false,
    isDeleted: initialData?.isDeleted || false,
    assignees: initialAssigneesKeys,
    parent: initialParent,
    grand: initialGrand,
  };
};

/**
 * Sanitizes raw data fields, builds relational structures based on the entity type,
 * and compiles the exact immutable payload for backend mutation pipelines.
 */
export const buildSubmissionPayload = (
  /** The raw unverified dataset captured directly from form inputs. */
  rawData: KanbanFormState,
  /** The operational workflow stage layout type. */
  mode: FormModeType,
  /** The target model type category being processed. */
  entityType: EntityType,
  /** The unique identification token of the active session operator. */
  operatorUid: string,
  /** The user profile name assigned to the dispatching entity. */
  operatorName: string,
  /** Roster tracking target unique identification keys of selected team workers. */
  availableUsers: Record<string, string>,
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

    const initialAssigneesKeys = initialData.assignees
      ? Object.keys(initialData.assignees)
      : [];

    const isAssigneesChanged =
      rawData.assignees.length !== initialAssigneesKeys.length ||
      !rawData.assignees.every((uid) => initialAssigneesKeys.includes(uid));

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

  const serverAssigneesRecord = rawData.assignees.reduce<
    Record<string, string>
  >((acc, uid) => {
    const userName = availableUsers[uid];

    if (userName) {
      acc[uid] = userName;
    }

    return acc;
  }, {});

  const basePayload = {
    ...rawData,
    uid: finalUid,
    title: sanitizedTitle,
    description: sanitizedDescription,
    createdBy: finalCreatedBy,
    createdByName: finalCreatedByName,
    assignees: serverAssigneesRecord,
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
