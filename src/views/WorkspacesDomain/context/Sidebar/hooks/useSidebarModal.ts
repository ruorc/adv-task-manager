import { useState, useCallback } from 'react';

import {
  EntityName,
  FormMode,
  type EntityType,
  type FormModeType,
} from '../../KanbanFormModal';

/**
 * Configuration schema defining the state operational metadata for active dialog views.
 */
interface ModalConfig {
  /** Conditional flag determining whether the dialog container is actively rendered. */
  readonly isOpen: boolean;
  /** The operational workflow state, managing creation or modification. */
  readonly mode: FormModeType;
  /** The target architectural classification of the active system entity. */
  readonly entityType: EntityType;
}

/**
 * Custom React hook that coordinates modal visibility state and structural configurations for entity workflows.
 */
export const useSidebarModal = () => {
  const [modalState, setModalState] = useState<ModalConfig>({
    isOpen: false,
    mode: FormMode.CREATE,
    entityType: EntityName.BOARD,
  });

  const openModal = useCallback(
    (mode: FormModeType, entityType: EntityType) => {
      setModalState({
        isOpen: true,
        mode,
        entityType,
      });
    },
    []
  );

  const openCreateModal = useCallback(
    (entityType: EntityType) => {
      openModal(FormMode.CREATE, entityType);
    },
    [openModal]
  );

  const openEditModal = useCallback(
    (entityType: EntityType) => {
      openModal(FormMode.EDIT, entityType);
    },
    [openModal]
  );

  const closeModal = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  return {
    isModalOpen: modalState.isOpen,
    modalConfig: {
      mode: modalState.mode,
      entityType: modalState.entityType,
    },
    openCreateModal,
    openEditModal,
    closeModal,
  };
};
