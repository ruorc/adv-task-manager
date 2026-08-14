import { type JSX } from 'react';
import { Typography } from '@mui/material';

import { EntityDashboardGrid } from '../../shared/EntityDashboardGrid';
import { BaseInteractiveCard } from '../../shared/BaseInteractiveCard';

import type { BoardItem } from '@/views/WorkspacesDomain/types/workspaceTypes';

/**
 * Structural blueprint defining the grid database collections necessary to display available workspaces.
 */
interface WorkspacesGridProps {
  /** Array containing targeted board items representing accessible workspaces. */
  readonly boards: readonly BoardItem[];
  /** Reactive callback dispatcher tracking user target selections when a card matrix element is clicked. */
  readonly onBoardSelect: (
    /** The targeted unique core database key mapping to the clicked dashboard structure. */
    uid: string
  ) => void;
}

/**
 * Pipeline component building the interactive board card matrix mapped from configuration entities.
 */
export const WorkspacesGrid = ({
  boards,
  onBoardSelect,
}: WorkspacesGridProps): JSX.Element => {
  return (
    <EntityDashboardGrid
      items={boards}
      renderItem={({ uid, title }) => (
        <BaseInteractiveCard key={uid} onClick={() => onBoardSelect(uid)}>
          <Typography variant="h6" component="h3">
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Open board management workflow
          </Typography>
        </BaseInteractiveCard>
      )}
    />
  );
};
