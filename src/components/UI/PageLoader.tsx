import { type JSX } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { APPLICATION_LOCALE } from '@/constants/localeConstants';
/**
 * Universal Shared High-Performance Fullscreen Accessibility Indicator Node.
 * Hardens layout stability during asynchronous thread loading or session token synchronization passes.
 */
export const PageLoader = (): JSX.Element => {
  return (
    <Box
      role="progressbar"
      aria-busy="true"
      aria-live="assertive"
      aria-label={APPLICATION_LOCALE.ui.loaderLabel}
      sx={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        zIndex: (theme) => theme.zIndex.modal + 100,
      }}
    >
      <CircularProgress
        size={44}
        thickness={4.5}
        color="primary"
        aria-valuenow={undefined}
        aria-valuemin={0}
        aria-valuemax={100}
        sx={{
          strokeLinecap: 'round',
        }}
      />
    </Box>
  );
};
