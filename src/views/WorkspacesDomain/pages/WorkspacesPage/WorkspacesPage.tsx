import { useState, type JSX } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Tabs,
  Tab,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import {
  useBoardsWorkflow,
  type BoardFilterMode,
} from '../../hooks/useBoardsWorkflow';

/**
 * Properties structure defined for the WorkspacesPage operational lifecycle.
 */
interface WorkspacesPageProps {
  /** Optional temporary user identifier used during initial testing phases. */
  currentUserUid?: string;
}

/**
 * Main workspace directory catalog rendering all available system boards and filter navigation states.
 */
export const WorkspacesPage = ({
  currentUserUid,
}: WorkspacesPageProps): JSX.Element => {
  const userUid = currentUserUid || 'current-user-id-stub';
  const [filterMode, setFilterMode] = useState<BoardFilterMode>('ALL');

  const {
    data: boards = {},
    isLoading,
    isError,
  } = useBoardsWorkflow(userUid, filterMode);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <Typography color="error">
          Failed to load workspaces. Please check network connectivity or try
          again.
        </Typography>
      </Box>
    );
  }

  const hasNoBoards = Object.keys(boards).length === 0;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'semibold' }}>
        Workspaces
      </Typography>

      <Tabs
        value={filterMode}
        onChange={(_, newValue: BoardFilterMode) => setFilterMode(newValue)}
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="All Boards" value="ALL" />
        <Tab label="My Boards" value="MY_BOARDS" />
        <Tab label="Shared Access" value="SHARED_ACCESS" />
      </Tabs>

      {hasNoBoards ? (
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
                {filterMode === 'ALL'
                  ? 'There are no active boards in this workspace. Use the creation controls located in the sidebar to build your first board.'
                  : 'No board criteria matching the active filter selection was found.'}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: 2,
          }}
        >
          {Object.entries(boards).map(([uid, title]) => (
            <Card
              key={uid}
              variant="outlined"
              sx={{ cursor: 'pointer', '&:hover': { boxShadow: 2 } }}
            >
              <CardContent>
                <Typography variant="h6" component="h3">
                  {title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Open board management workflow
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};
