import { type JSX, useMemo, createElement } from 'react';
import { useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import AssignmentIcon from '@mui/icons-material/Assignment';

import { getBoardsQueryConfig } from '@/utils/loader';
import { useRequiredAuth } from '@/context/Auth/hooks/useRequiredAuth';
import { useSidebarModal } from './hooks/useSidebarModal';
import { useSidebarDelete } from './hooks/useSidebarDelete';
import { EntityName } from '../KanbanFormModal/constants/constants';
import { UI_TEXTS } from './constants/texts';
import { ConnectedEntityModal } from '../../components/ConnectedEntityModal';
import { SidebarCreateButton } from './components/SidebarCreateButton';
import { SidebarActionGroup } from './components/SidebarActionGroup';
import { useBoardsWorkflow } from '../../hooks/useBoardsWorkflow';

import type { AppKanbanEntities } from '@/types/appKanbanTypes';

/**
 * Sidebar component for the workspaces view, providing global entity filtering actions,
 * entity creation entry points, and owner management controls.
 */
export const WorkspacesSidebar = (): JSX.Element => {
  const { uid, operatorName } = useRequiredAuth();
  const { boardId, columnId, taskId } = useParams<{
    readonly boardId?: string;
    readonly columnId?: string;
    readonly taskId?: string;
  }>();

  const queryClient = useQueryClient();

  /** Triggers the remote data pipeline to keep the TanStack React Query cache warm. */
  useBoardsWorkflow(uid, 'ALL');

  const currentEntity = useMemo<
    (AppKanbanEntities & { readonly isEmpty: boolean }) | null
  >(() => {
    if (taskId) {
      return {
        uid: taskId,
        title: 'Active Task Name',
        description: '',
        createdBy: uid,
        createdByName: operatorName,
        assignees: {},
        isCompleted: false,
        isDeleted: false,
        isEmpty: true,
      };
    }

    if (columnId) {
      return {
        uid: columnId,
        title: 'Active Column Name',
        description: '',
        createdBy: uid,
        createdByName: operatorName,
        assignees: {},
        isCompleted: false,
        isDeleted: false,
        isEmpty: true,
      };
    }

    if (boardId) {
      const { queryKey } = getBoardsQueryConfig(uid);
      const cachedBoards =
        queryClient.getQueryData<AppKanbanEntities[]>(queryKey);
      const activeBoard = cachedBoards?.find((b) => b.uid === boardId);

      if (!activeBoard) {
        return null;
      }

      return {
        ...activeBoard,
        isEmpty: true,
      };
    }

    return null;
  }, [boardId, columnId, taskId, queryClient, uid, operatorName]);

  const isOwner = Boolean(currentEntity && currentEntity.createdBy === uid);

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
      assignees: {},
      description: '',
      createdByName: '',
      isEmpty: true,
    }
  );

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
            onClick={() => openCreateModal(EntityName.BOARD)}
          />
          <SidebarActionGroup
            isVisible={Boolean(boardId && !columnId && !taskId && isOwner)}
            onEdit={() => openEditModal(EntityName.BOARD)}
            onDelete={() => handleDelete(EntityName.BOARD)}
          />

          <SidebarCreateButton
            label={UI_TEXTS.NEW_COLUMN}
            icon={<ViewColumnIcon />}
            color="secondary"
            onClick={() => openCreateModal(EntityName.COLUMN)}
          />
          <SidebarActionGroup
            isVisible={Boolean(columnId && !taskId && isOwner)}
            onEdit={() => openEditModal(EntityName.COLUMN)}
            onDelete={() => handleDelete(EntityName.COLUMN)}
          />

          <SidebarCreateButton
            label={UI_TEXTS.NEW_TASK}
            icon={<AssignmentIcon />}
            color="success"
            onClick={() => openCreateModal(EntityName.TASK)}
          />
          <SidebarActionGroup
            isVisible={Boolean(taskId && isOwner)}
            onEdit={() => openEditModal(EntityName.TASK)}
            onDelete={() => handleDelete(EntityName.TASK)}
          />
        </Stack>
      </Box>

      {createElement(ConnectedEntityModal, {
        isOpen: isModalOpen,
        onClose: closeModal,
        mode: modalConfig.mode,
        entityType: modalConfig.entityType,
      })}
    </>
  );
};
