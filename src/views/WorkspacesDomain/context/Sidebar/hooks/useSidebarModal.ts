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
  /** The operational workflow state, managing creation or modification. */
  mode: FormModeType;
  /** The target architectural classification of the active system entity. */
  entityType: EntityType;
}

/**
 * Custom React hook that coordinates modal visibility state and structural configurations for entity workflows.
 */
export const useSidebarModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    mode: FormMode.CREATE,
    entityType: EntityName.BOARD,
  });

  const openCreateModal = useCallback((entityType: EntityType) => {
    setModalConfig({
      mode: FormMode.CREATE,
      entityType,
    });
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((entityType: EntityType) => {
    setModalConfig({
      mode: FormMode.EDIT,
      entityType,
    });
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    modalConfig,
    openCreateModal,
    openEditModal,
    closeModal,
  };
};
