import { type JSX, type ReactNode } from 'react';

import { EntityModalContext } from '../context/UniversalEntityModalContext';
import { useEntityModalForm } from '../hooks/useEntityModalForm';

import type {
  ModalContextValue,
  UniversalEntityModalProps,
} from '../types/types';

/**
 * Properties for the EntityModalProvider component.
 */
interface ModalProviderProps extends UniversalEntityModalProps {
  /** The child React elements that require access to the synchronized modal form context. */
  children: ReactNode;
}

/**
 * Stateful state machine container initializing validation context and managing values sync pipelines.
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
