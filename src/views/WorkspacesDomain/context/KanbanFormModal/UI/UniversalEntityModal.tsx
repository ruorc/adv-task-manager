import { type JSX } from 'react';
import { Dialog } from '@mui/material';

import type { UniversalEntityModalProps } from '../types/types';
import { EntityModalProvider } from '../providers/UniversalEntityModalProvider';
import { ModalFormContent } from '../components/ModalFormContent';

/**
 * Universal Dialog wrapper implementing isolated context architecture and atomic layouts.
 */
export const UniversalEntityModal = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  entityType,
  initialData,
  availableUsers,
  availableBoards,
  availableColumns,
}: UniversalEntityModalProps): JSX.Element => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      disableRestoreFocus
    >
      <EntityModalProvider
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        mode={mode}
        entityType={entityType}
        initialData={initialData}
        availableUsers={availableUsers}
        availableBoards={availableBoards}
        availableColumns={availableColumns}
      >
        <ModalFormContent
          availableUsers={availableUsers}
          availableBoards={availableBoards}
          availableColumns={availableColumns}
        />
      </EntityModalProvider>
    </Dialog>
  );
};
