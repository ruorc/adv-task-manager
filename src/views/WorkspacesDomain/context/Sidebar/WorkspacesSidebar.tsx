import { type JSX } from 'react';
import { useParams } from 'react-router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import AssignmentIcon from '@mui/icons-material/Assignment';

import { useRequiredAuth } from '@/context/Auth/hooks/useRequiredAuth';
import { useSidebarModal } from './hooks/useSidebarModal';
import { useSidebarDelete } from './hooks/useSidebarDelete';
import { useCurrentWorkspaceEntity } from './hooks/useCurrentWorkspaceEntity';
import { UI_TEXTS } from './constants/texts';
import { SidebarCreateButton } from './components/SidebarCreateButton';
import { SidebarActionGroup } from './components/SidebarActionGroup';
import { useBoardsWorkflow } from '../../hooks/useBoardsWorkflow';
import { ConnectedEntityModal } from '../../components/ConnectedEntityModal';
import { EntityName, type EntityType } from '../KanbanFormModal';

/**
 * Interface representing the structural configuration for each sidebar action group.
 */
interface SidebarItemConfig {
  /** The targeted workspace entity type signature based on application constants. */
  readonly type: EntityType;
  /** The localized label text to display within the interactive trigger button. */
  readonly label: string;
  /** The visual graphic layout icon representing the domain level context. */
  readonly icon: JSX.Element;
  /** Theme color designation mapped to the standard layout color framework. */
  readonly color: 'primary' | 'secondary' | 'success';
  /** Evaluation flag dictating if management edit/delete buttons should render for this scope. */
  readonly isActionGroupVisible: boolean;
}

/**
 * Sidebar component for the workspaces view, providing global entity filtering actions,
 * entity creation entry points, and owner management controls.
 */
export const WorkspacesSidebar = (): JSX.Element => {
  const { uid } = useRequiredAuth();
  const { boardId, columnId, taskId } = useParams<{
    readonly boardId?: string;
    readonly columnId?: string;
    readonly taskId?: string;
  }>();

  useBoardsWorkflow(uid, 'ALL');

  const { currentEntity, isOwner } = useCurrentWorkspaceEntity(uid);
  const {
    isModalOpen,
    modalConfig,
    openCreateModal,
    openEditModal,
    closeModal,
  } = useSidebarModal();

  const { handleDelete } = useSidebarDelete(
    currentEntity || {
      uid: '',
      title: '',
      createdBy: '',
      isCompleted: false,
      isDeleted: false,
      assignees: [],
      description: '',
      createdByName: '',
      isEmpty: true,
    }
  );

  const menuConfig: readonly SidebarItemConfig[] = [
    {
      type: EntityName.BOARD,
      label: UI_TEXTS.NEW_BOARD,
      icon: <AddBoxIcon />,
      color: 'primary',
      isActionGroupVisible: Boolean(boardId && !columnId && !taskId && isOwner),
    },
    {
      type: EntityName.COLUMN,
      label: UI_TEXTS.NEW_COLUMN,
      icon: <ViewColumnIcon />,
      color: 'secondary',
      isActionGroupVisible: Boolean(columnId && !taskId && isOwner),
    },
    {
      type: EntityName.TASK,
      label: UI_TEXTS.NEW_TASK,
      icon: <AssignmentIcon />,
      color: 'success',
      isActionGroupVisible: Boolean(taskId && isOwner),
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          p: 3,
          bgcolor: 'background.paper',
          color: 'text.primary',
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, textTransform: 'uppercase', mb: 3 }}
        >
          {UI_TEXTS.HEADER}
        </Typography>
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<SearchIcon />}
            disabled
            sx={{ justifyContent: 'flex-start', opacity: 0.6 }}
          >
            {UI_TEXTS.SEARCH}
          </Button>
          <Divider sx={{ my: 1 }} />

          {menuConfig.map(
            ({ type, label, icon, color, isActionGroupVisible }) => (
              <Box key={type}>
                <SidebarCreateButton
                  label={label}
                  icon={icon}
                  color={color}
                  onClick={() => openCreateModal(type)}
                />
                <SidebarActionGroup
                  isVisible={isActionGroupVisible}
                  onEdit={() => openEditModal(type)}
                  onDelete={() => handleDelete(type)}
                />
              </Box>
            )
          )}
        </Stack>
      </Box>

      <ConnectedEntityModal
        isOpen={isModalOpen}
        onClose={closeModal}
        mode={modalConfig.mode}
        entityType={modalConfig.entityType}
      />
    </>
  );
};
