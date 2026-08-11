import { type JSX } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

/**
 * Operational properties governing conditional structural rendering during database lookup pipelines.
 */
interface DataLifecycleWrapperProps {
  /** Evaluation metric indicating if the server-side communication loop is still pending. */
  readonly isLoading: boolean;
  /** Validation indicator specifying if the remote query request has completed with errors. */
  readonly isError: boolean;
  /** Validation criteria indicating the absence of active domain models in the current system state. */
  readonly isEmpty: boolean;
  /** Fallback layout block rendered when no domain objects are available for visualization. */
  readonly emptyState: JSX.Element;
  /** React node elements displayed when data fields have successfully resolved. */
  readonly children: React.ReactNode;
}

/**
 * Top-level structural wrapper intercepting and rendering specific fallback screens based on raw query feedback metrics.
 */
export const DataLifecycleWrapper = ({
  isLoading,
  isError,
  isEmpty,
  emptyState,
  children,
}: DataLifecycleWrapperProps): JSX.Element => {
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '40vh',
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
          An unexpected error occurred while synchronization procedures were
          running. Please try again.
        </Typography>
      </Box>
    );
  }

  if (isEmpty) {
    return emptyState;
  }

  return <>{children}</>;
};
