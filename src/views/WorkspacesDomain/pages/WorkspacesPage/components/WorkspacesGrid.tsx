import { type JSX } from 'react';
import { Typography } from '@mui/material';

import { EntityDashboardGrid } from '../../shared/EntityDashboardGrid';
import { BaseInteractiveCard } from '../../shared/BaseInteractiveCard';

/**
 * Type construction extracting dictionary records into strict key-value sequence pairs.
 */
interface BoardItem {
  /** The targeted unique core database key mapping to the dashboard structure. */
  readonly uid: string;
  /** The visual description identifier assigned to the target data board. */
  readonly title: string;
}

/**
 * Structural blueprint defining the grid database collections necessary to display available workspaces.
 */
interface WorkspacesGridProps {
  /** Directory mapping containing targeted unique identification keys to their respective descriptive titles. */
  readonly boards: Record<string, string>;
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
  const boardItems: readonly BoardItem[] = Object.entries(boards).map(
    ([uid, title]) => ({
      uid,
      title,
    })
  );

  return (
    <EntityDashboardGrid
      items={boardItems}
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
