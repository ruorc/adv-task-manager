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
  isVisible: boolean;
  /** Callback trigger invoked when requesting modification workflows for the active entity. */
  onEdit: () => void;
  /** Callback trigger invoked when requesting structural deletion pipelines for the active entity. */
  onDelete: () => void;
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
    <Stack direction="row" spacing={1} sx={{ pl: 2 }}>
      <Button
        size="small"
        startIcon={<EditIcon />}
        color="inherit"
        fullWidth
        onClick={onEdit}
      >
        {UI_TEXTS.EDIT}
      </Button>
      <Button
        size="small"
        startIcon={<DeleteIcon />}
        color="error"
        fullWidth
        onClick={onDelete}
      >
        {UI_TEXTS.DELETE}
      </Button>
    </Stack>
  );
};
