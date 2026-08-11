import { type JSX } from 'react';
import { Box } from '@mui/material';

/**
 * Generic parameters mapping arrays into uniform responsive grid sections.
 */
interface EntityDashboardGridProps<T> {
  /** Array tracking active records or data nodes fetched from database sources. */
  readonly items: readonly T[];
  /** Functional renderer processing item entities into strict user interface configurations. */
  readonly renderItem: (
    /** The individual data entry parameter context mapping to the specific array coordinate index. */
    item: T
  ) => JSX.Element;
}

/**
 * Fluid wrapper organizing array structures into a standard responsive UI grid matrix.
 */
export const EntityDashboardGrid = <T,>({
  items,
  renderItem,
}: EntityDashboardGridProps<T>): JSX.Element => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: 2,
    }}
  >
    {items.map(renderItem)}
  </Box>
);
