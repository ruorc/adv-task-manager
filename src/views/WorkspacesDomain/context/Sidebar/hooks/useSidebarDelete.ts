import { useCallback } from 'react';
import { useConfirm } from '@/context/Confirm';
import { useSnack } from '@/context/Snack';
import { UI_TEXTS } from '../constants/texts';

import { sysLogger } from '@/utils/logger';
import { EntityName, type EntityType } from '../../KanbanFormModal';

import type { AppKanbanEntities } from '@/types/appKanbanTypes';

const logger = sysLogger.forModule('useSidebarDelete');

/** Extended layout record describing entity fields along with structural emptiness parameters. */
type EntityData = AppKanbanEntities & {
  /** Optional flag specifying whether the current target entity container holds nested items. */
  isEmpty?: boolean;
};

/**
 * Custom React hook that coordinates entity destruction pipelines and triggers contextual confirmation workflows.
 */
export const useSidebarDelete = (currentEntity: EntityData) => {
  const { showConfirm } = useConfirm();
  const { showSuccessSnack, showErrorSnack } = useSnack();

  const handleDelete = useCallback(
    async (entityType: EntityType) => {
      const isContainerEntity =
        entityType === EntityName.BOARD || entityType === EntityName.COLUMN;

      if (isContainerEntity && !currentEntity.isEmpty) {
        showErrorSnack(UI_TEXTS.DELETE_ERROR_NOT_EMPTY);

        return;
      }

      try {
        await showConfirm({
          title: UI_TEXTS.CONFIRM_DELETE_TITLE,
          description: UI_TEXTS.CONFIRM_DELETE_DESC(currentEntity.title || ''),
          confirmLabel: UI_TEXTS.CONFIRM_BTN,
          cancelLabel: UI_TEXTS.CANCEL_BTN,
        });

        // TODO: dispatch api action here to delete entity
        logger.info('Entity deleted:' + entityType + currentEntity.uid);

        showSuccessSnack(UI_TEXTS.DELETE_SUCCESS);
      } catch {
        // silence
      }
    },
    [showConfirm, showSuccessSnack, showErrorSnack, currentEntity]
  );

  return { handleDelete };
};
