import { type JSX } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { APPLICATION_NAME, PROJECT_FOUNDATION_YEAR } from '@/config/appConfig';

/**
 * Standard un-fixed global system footer coordinating copyright metrics and layout boundary visual lines.
 * Synchronizes layout colors dynamically across multi-mode theme selection state mutations.
 */
export const Footer = (): JSX.Element => {
  const currentChronologyYear = new Date().getFullYear();

  const copyrightDurationLabel =
    currentChronologyYear > PROJECT_FOUNDATION_YEAR
      ? `${PROJECT_FOUNDATION_YEAR}–${currentChronologyYear}`
      : `${PROJECT_FOUNDATION_YEAR}`;

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        py: { xs: 2, sm: 2.5 },
        px: { xs: 2, sm: 3 },
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        textAlign: 'center',
        mt: 'auto',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          fontWeight: 500,
          letterSpacing: '-0.01em',
          fontSize: { xs: '0.8rem', sm: '0.875rem' },
        }}
      >
        &copy; {copyrightDurationLabel} {APPLICATION_NAME}. All operational
        rights reserved.
      </Typography>
    </Box>
  );
};
