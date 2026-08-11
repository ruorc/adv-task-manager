import { type JSX } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import type { BoardFilterMode } from '../../../types/workspaceTypes';

/** Structural blueprint defining the reactive parameters required to render the layout placeholder. */
interface WorkspacesEmptyStateProps {
  /** The specific query parameters or selection state currently limiting the board list. */
  readonly currentFilter: BoardFilterMode;
}

/** Placeholder component displaying a fallback communication box when no board records are available. */
export const WorkspacesEmptyState = ({
  currentFilter,
}: WorkspacesEmptyStateProps): JSX.Element => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '40vh',
    }}
  >
    <Card
      variant="outlined"
      sx={{
        maxWidth: 400,
        textAlign: 'center',
        backgroundColor: 'action.hover',
        borderStyle: 'dashed',
        borderRadius: 2,
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          py: 4,
        }}
      >
        <InfoOutlinedIcon color="info" sx={{ fontSize: 40 }} />
        <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
          No boards found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {currentFilter === 'ALL'
            ? 'There are no active boards in this workspace. Use the creation controls located in the sidebar to build your first board.'
            : 'No board criteria matching the active filter selection was found.'}
        </Typography>
      </CardContent>
    </Card>
  </Box>
);
