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

import { useAuth } from '@/context/Auth';
import { useSidebarModal } from './hooks/useSidebarModal';
import { useSidebarDelete } from './hooks/useSidebarDelete';
import { EntityType } from '../KanbanFormModal/constants/constants';
import { UI_TEXTS } from './constants/texts';
import { ConnectedEntityModal } from '../../components/ConnectedEntityModal';
import { SidebarCreateButton } from './components/SidebarCreateButton';
import { SidebarActionGroup } from './components/SidebarActionGroup';

/**
 * Sidebar component for the workspaces view, providing global entity filtering actions, entity creation entry points, and owner management controls.
 */
export const WorkspacesSidebar = (): JSX.Element => {
  const { uid } = useAuth();
  const { boardId, columnId, taskId } = useParams<{
    boardId?: string;
    columnId?: string;
    taskId?: string;
  }>();

  // Заглушка текущей сущности для проверки прав (isOwner)
  const currentEntity = {
    uid: 'MOCK_ENTITY_ID',
    title: UI_TEXTS.FALLBACK_ENTITY_TITLE,
    createdBy: 'MOCK_USER_ID',
    isEmpty: true,
  };
  const isOwner = Boolean(uid && currentEntity?.createdBy === uid);

  const {
    isModalOpen,
    modalConfig,
    openCreateModal,
    openEditModal,
    closeModal,
  } = useSidebarModal();
  const { handleDelete } = useSidebarDelete(currentEntity);

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

          <SidebarCreateButton
            label={UI_TEXTS.NEW_BOARD}
            icon={<AddBoxIcon />}
            color="primary"
            onClick={() => openCreateModal(EntityType.BOARD)}
          />
          <SidebarActionGroup
            isVisible={Boolean(boardId && !columnId && !taskId && isOwner)}
            onEdit={() => openEditModal(EntityType.BOARD)}
            onDelete={() => handleDelete(EntityType.BOARD)}
          />

          <SidebarCreateButton
            label={UI_TEXTS.NEW_COLUMN}
            icon={<ViewColumnIcon />}
            color="secondary"
            onClick={() => openCreateModal(EntityType.COLUMN)}
          />
          <SidebarActionGroup
            isVisible={Boolean(columnId && !taskId && isOwner)}
            onEdit={() => openEditModal(EntityType.COLUMN)}
            onDelete={() => handleDelete(EntityType.COLUMN)}
          />

          <SidebarCreateButton
            label={UI_TEXTS.NEW_TASK}
            icon={<AssignmentIcon />}
            color="success"
            onClick={() => openCreateModal(EntityType.TASK)}
          />
          <SidebarActionGroup
            isVisible={Boolean(taskId && isOwner)}
            onEdit={() => openEditModal(EntityType.TASK)}
            onDelete={() => handleDelete(EntityType.TASK)}
          />
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
