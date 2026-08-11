import { type JSX } from 'react';
import { Tabs, Tab } from '@mui/material';
import type { BoardFilterMode } from '../../../types/workspaceTypes';

/**
 * Configuration blueprint regulating a single layout view selector tab element.
 */
interface FilterTabConfig {
  /** The targeted unique evaluation string applied during array lookup modifications. */
  readonly value: BoardFilterMode;
  /** The visual localized descriptor displayed directly onto the component interface. */
  readonly label: string;
}

/**
 * Structural blueprint defining the validation payload fields required by the tab array wrapper.
 */
interface WorkspacesFilterTabsProps {
  /** The active filtering strategy metric determining the selected navigation node state. */
  readonly currentFilter: BoardFilterMode;
  /** Reactive callback pipeline triggering parameter updates upon selecting another layout state. */
  readonly onFilterChange: (
    /** The newly designated selection query criteria flag chosen by the system client. */
    value: BoardFilterMode
  ) => void;
}

/**
 * Static array catalog detailing the operational filter choices for the dashboard viewports.
 */
const FILTER_TABS: readonly FilterTabConfig[] = [
  { value: 'ALL', label: 'All Boards' },
  { value: 'MY_BOARDS', label: 'My Boards' },
  { value: 'SHARED_ACCESS', label: 'Shared Access' },
] as const;

/**
 * Orchestrated navigation node tracking and distributing layout filter queries across data boards.
 */
export const WorkspacesFilterTabs = ({
  currentFilter,
  onFilterChange,
}: WorkspacesFilterTabsProps): JSX.Element => (
  <Tabs
    value={currentFilter}
    onChange={(_, newValue: BoardFilterMode) => onFilterChange(newValue)}
    sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
  >
    {FILTER_TABS.map(({ value, label }) => (
      <Tab key={value} value={value} label={label} />
    ))}
  </Tabs>
);
