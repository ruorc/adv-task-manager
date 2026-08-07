import { useCallback, createElement, type JSX } from 'react';
import { useParams } from 'react-router';

import { sysLogger } from '@/utils/logger';
import { useSnack } from '@/context/Snack';
import { useAuth } from '@/context/Auth';
import { firestoreBoardService } from '@/firebase/services/FirestoreBoardService';
import {
  UniversalEntityModal,
  EntityType,
  FormMode,
} from '../context/KanbanFormModal';
import { useAllUsers } from '../hooks/useAllUsers';
import { useBoardsWorkflow } from '../hooks/useBoardsWorkflow';

import type { KanbanEntities } from '../context/KanbanFormModal';

const logger = sysLogger.forModule('FirebaseAuthService');

/**
 * Properties for the ConnectedEntityModal component.
 */
interface ConnectedEntityModalProps {
  /** Controls the visibility state of the connected entity modal dialog. */
  isOpen: boolean;
  /** Callback trigger invoked to safely close the active modal layout. */
  onClose: () => void;
  /** Operational workflow configuration setting the form state to creation or modification. */
  mode: FormMode;
  /** Target architectural category classification for the processed entity metadata. */
  entityType: EntityType;
}

/**
 * A connected dialog component wrapper that hooks into routing parameters and mutation pipelines to manage the target entity layout state.
 */
export const ConnectedEntityModal = ({
  isOpen,
  onClose,
  mode,
  entityType,
}: ConnectedEntityModalProps): JSX.Element => {
  const { showSuccessSnack, showErrorSnack } = useSnack();
  const { boardId, columnId, taskId } = useParams<{
    boardId?: string;
    columnId?: string;
    taskId?: string;
  }>();

  /** Extract the current active session authentication status from the core security provider */
  const { user } = useAuth();
  const currentOperatorUid = user?.uid;

  const initialData: Partial<KanbanEntities> | undefined = undefined;

  if (mode === FormMode.EDIT) {
    if (entityType === EntityType.BOARD && boardId) {
      // initialData = useAppSelector(state => selectBoardById(state, boardId));
    } else if (entityType === EntityType.COLUMN && columnId) {
      // initialData = useAppSelector(state => selectColumnById(state, columnId));
    } else if (entityType === EntityType.TASK && taskId) {
      // initialData = useAppSelector(state => selectTaskById(state, taskId));
    }
  }

  /** Synchronize the global system operators collection memory directory passes */
  const { data: availableUsers = {} } = useAllUsers(currentOperatorUid);

  /** Synchronize all globally active system boards and automatically map them to a text dictionary */
  const { data: availableBoards = {} } = useBoardsWorkflow(
    currentOperatorUid,
    'ALL'
  );

  const availableColumns: Record<string, string> = {};

  const handleSaveData = useCallback(
    async (data: KanbanEntities) => {
      try {
        await firestoreBoardService.createBoard(data);

        showSuccessSnack('Successfully saved!');
        onClose();
      } catch (error) {
        logger.error('Firestore transaction crashed', error);

        showErrorSnack('Data not saved');
      }
    },
    [showSuccessSnack, showErrorSnack, onClose]
  );

  return createElement(UniversalEntityModal, {
    isOpen: isOpen,
    onClose: onClose,
    onSubmit: handleSaveData,
    mode: mode,
    entityType: entityType,
    initialData: initialData,
    availableUsers: availableUsers,
    availableBoards: availableBoards,
    availableColumns: availableColumns,
  });
};
