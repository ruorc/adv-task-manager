import { type JSX } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { UI_TEXTS } from '../constants/texts';

/**
 * Properties for the SidebarActionGroup component.
 */
interface SidebarActionGroupProps {
  /** Conditional flag determining whether the operation actions are rendered in the layout. */
  readonly isVisible: boolean;
  /** Callback trigger invoked when requesting modification workflows for the active entity. */
  readonly onEdit: () => void;
  /** Callback trigger invoked when requesting structural deletion pipelines for the active entity. */
  readonly onDelete: () => void;
}

/**
 * A layout container group displaying contextual modification and deletion trigger controls for entities.
 */
export const SidebarActionGroup = ({
  isVisible,
  onEdit,
  onDelete,
}: SidebarActionGroupProps): JSX.Element | null => {
  if (!isVisible) return null;

  return (
    <Stack direction="row" spacing={1} sx={{ pl: 2, width: '100%' }}>
      <Button
        size="small"
        startIcon={<EditIcon />}
        color="inherit"
        aria-label="Edit current workspace entity property values"
        onClick={onEdit}
        sx={{ flexGrow: 1 }}
      >
        {UI_TEXTS.EDIT}
      </Button>
      <Button
        size="small"
        startIcon={<DeleteIcon />}
        color="error"
        aria-label="Delete current workspace entity resource from registry"
        onClick={onDelete}
        sx={{ flexGrow: 1 }}
      >
        {UI_TEXTS.DELETE}
      </Button>
    </Stack>
  );
};
