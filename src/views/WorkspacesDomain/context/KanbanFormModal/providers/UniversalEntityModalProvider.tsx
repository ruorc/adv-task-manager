import { type JSX } from 'react';

import { EntityModalContext } from '../context/UniversalEntityModalContext';
import { useEntityModalForm } from '../hooks/useEntityModalForm';

import type {
  ModalContextValue,
  ModalProviderProps,
} from '../types/kanbanTypes';

/**
 * Stateful state machine container initializing validation context
 * and managing values synchronization pipelines.
 */
export const EntityModalProvider = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  entityType,
  initialData,
  availableUsers,
  availableBoards,
  availableColumns,
  children,
}: ModalProviderProps): JSX.Element => {
  const { formMethods, handleSubmitForm } = useEntityModalForm({
    isOpen,
    onClose,
    onSubmit,
    mode,
    entityType,
    initialData,
    availableUsers,
    availableColumns,
  });

  const contextValue: ModalContextValue = {
    formMethods,
    mode,
    entityType,
    availableUsers,
    availableBoards,
    availableColumns,
    onClose,
    handleSubmitForm,
  };

  return (
    <EntityModalContext.Provider value={contextValue}>
      {children}
    </EntityModalContext.Provider>
  );
};
