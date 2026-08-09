import { useCallback, createElement, type JSX } from 'react';
import { useParams } from 'react-router';

import { sysLogger } from '@/utils/logger';
import { useSnack } from '@/context/Snack';
import { useAuth } from '@/context/Auth';
import { firestoreBoardService } from '@/firebase/services/FirestoreBoardService';

import { useAllUsers } from '../hooks/useAllUsers';
import { useBoardsWorkflow } from '../hooks/useBoardsWorkflow';
import { EntityName, FormMode, UniversalEntityModal } from '../context/KanbanFormModal';

import type { AppKanbanEntities, KanbanCreatePayload } from '@/types/appKanbanTypes';
import type { EntityType, FormModeType } from '../context/KanbanFormModal';

const logger = sysLogger.forModule('ConnectedEntityModal');

/**
 * Structural communication contract specifying core initialization parameters 
 * and visibility handlers for the connected entity modal component.
 */
interface ConnectedEntityModalProps {
  /** Controls the visibility state of the connected entity modal dialog. */
  readonly isOpen: boolean;
  /** Callback trigger invoked to safely close the active modal layout. */
  readonly onClose: () => void;
  /** Operational workflow configuration setting the form state to creation or modification. */
  readonly mode: FormModeType;
  /** Target architectural category classification for the processed entity metadata. */
  readonly entityType: EntityType;
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
    readonly boardId?: string;
    readonly columnId?: string;
    readonly taskId?: string;
  }>();

  /** Extract the current active session authentication status from the core security provider */
  const { user } = useAuth();
  const currentOperatorUid = user?.uid;

  // ИСПРАВИТЬ: Временное использование const для удовлетворения ESLint prefer-const
  const initialData: Partial<AppKanbanEntities> | undefined = undefined;

  if (mode === FormMode.EDIT) {
    if (entityType === EntityName.BOARD && boardId) {
      // initialData = useAppSelector(state => selectBoardById(state, boardId));
    } else if (entityType === EntityName.COLUMN && columnId) {
      // initialData = useAppSelector(state => selectColumnById(state, columnId));
    } else if (entityType === EntityName.TASK && taskId) {
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

  /**
   * Processes form submission by identifying the runtime operational mode.
   * Leverages type guards ensuring correct data payload distribution to storage layers.
   */
  const handleSaveData = useCallback(
    async (data: AppKanbanEntities | KanbanCreatePayload) => {
      try {
        if ('uid' in data && data.uid) {
          await firestoreBoardService.updateBoard(data.uid, data);
          showSuccessSnack('Successfully updated!');
        } else {
          await firestoreBoardService.createBoard(data as KanbanCreatePayload);
          showSuccessSnack('Successfully created!');
        }
        
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
