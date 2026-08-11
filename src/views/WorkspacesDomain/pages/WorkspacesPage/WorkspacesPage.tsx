import { type JSX } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { Box, Typography } from '@mui/material';

import { useRequiredAuth } from '@/context/Auth/hooks/useRequiredAuth';
import { useBoardsWorkflow } from '../../hooks/useBoardsWorkflow';
import { WorkspacesFilterTabs } from './components/WorkspacesFilterTabs';
import { WorkspacesEmptyState } from './components/WorkspacesEmptyState';
import { WorkspacesGrid } from './components/WorkspacesGrid';

import { DataLifecycleWrapper } from '../shared/DataLifecycleWrapper';
import type { BoardFilterMode } from '../../types/workspaceTypes';
import { routeHelpers } from '@/routes';

/**
 * Main orchestrator catalog grid rendering all accessible board dashboard structures and filter lifecycle pipelines.
 */
export const WorkspacesPage = (): JSX.Element => {
  const { uid: userUid } = useRequiredAuth();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter =
    (searchParams.get('filter') as BoardFilterMode) || 'ALL';

  const {
    data: boards = {},
    isLoading,
    isError,
  } = useBoardsWorkflow(userUid, currentFilter);

  const handleBoardNavigation = (uid: string): void => {
    navigate(routeHelpers.boardDetail(uid));
  };

  const hasNoBoards = Object.keys(boards).length === 0;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'semibold' }}>
        Workspaces
      </Typography>

      <WorkspacesFilterTabs
        currentFilter={currentFilter}
        onFilterChange={(newValue) => setSearchParams({ filter: newValue })}
      />

      <DataLifecycleWrapper
        isLoading={isLoading}
        isError={isError}
        isEmpty={hasNoBoards}
        emptyState={<WorkspacesEmptyState currentFilter={currentFilter} />}
      >
        <WorkspacesGrid boards={boards} onBoardSelect={handleBoardNavigation} />
      </DataLifecycleWrapper>
    </Box>
  );
};
