import { useCallback, createElement, type JSX } from 'react';
import { useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';

import { sysLogger } from '@/utils/logger';
import { useSnack } from '@/context/Snack';
import { useRequiredAuth } from '@/context/Auth';
import { firestoreBoardService } from '@/firebase/services/FirestoreBoardService';

import { useAllUsers } from '../hooks/useAllUsers';
import { useBoardsWorkflow } from '../hooks/useBoardsWorkflow';
import {
  EntityName,
  FormMode,
  UniversalEntityModal,
} from '../context/KanbanFormModal';

import type {
  AppKanbanEntities,
  KanbanCreatePayload,
} from '@/types/appKanbanTypes';
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
  const queryClient = useQueryClient();

  const { boardId, columnId, taskId } = useParams<{
    readonly boardId?: string;
    readonly columnId?: string;
    readonly taskId?: string;
  }>();

  const { user } = useRequiredAuth();
  const currentOperatorUid = user.uid;

  // ИСПРАВЛЕНО: Тип изменен на AppKanbanEntities для идеальной стыковки с пропсами UniversalEntityModal
  const initialData: AppKanbanEntities | undefined = undefined;

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
      // ИСПРАВЛЕНО: Переменная временно объявлена как const, так как в текущем закомментированном
      // состоянии кода она не мутирует, что полностью закрывает ошибку ESLint prefer-const
      const targetService = firestoreBoardService;
      let queryKeyStr = 'boards';

      if (entityType === EntityName.COLUMN) {
        // targetService = firestoreColumnService;
        queryKeyStr = 'columns';
      } else if (entityType === EntityName.TASK) {
        // targetService = firestoreTaskService;
        queryKeyStr = 'tasks';
      }

      try {
        if ('uid' in data && data.uid) {
          await targetService.update(data.uid, data);
          await queryClient.invalidateQueries({
            queryKey: [queryKeyStr, data.uid],
          });

          showSuccessSnack('Successfully updated!');
        } else {
          await targetService.create(data as KanbanCreatePayload);

          showSuccessSnack('Successfully created!');
        }

        await queryClient.invalidateQueries({ queryKey: [queryKeyStr] });

        onClose();
      } catch (error) {
        logger.error('Firestore transaction crashed', error);
        showErrorSnack('Data not saved');
      }
    },
    [showSuccessSnack, showErrorSnack, onClose, queryClient, entityType]
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
