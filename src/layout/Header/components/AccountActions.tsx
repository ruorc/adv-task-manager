import { type JSX } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useAuthModal } from '@/context/AuthModal';

/**
 * Pure presentation contract representing access controls and session triggers.
 */
interface AccountActionsProps {
  /** Name of the currently authenticated operator, if any */
  readonly authenticatedOperatorName: string | null;
  /** Callback proxy engineered to cleanly dispatch logout requests */
  readonly onLogout: () => void;
}

/**
 * Clean isolated authentication widget managing typography nodes and authorization execution triggers.
 */
export const AccountActions = ({
  authenticatedOperatorName,
  onLogout: onLogout,
}: AccountActionsProps): JSX.Element => {
  const { openLogin } = useAuthModal();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
      <Typography
        variant="body2"
        sx={{
          textAlign: 'center',
          color: 'text.secondary',
          fontWeight: 500,
          display: { xs: 'none', sm: 'block' },
          fontSize: '0.875rem',
        }}
      >
        authenticatedOperatorName ? `Welcome, ${authenticatedOperatorName}` :
        'Welcome, Guest'
      </Typography>

      {authenticatedOperatorName ? (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={onLogout}
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 1.5,
            px: { xs: 1.5, sm: 2.5 },
            '&.Mui-focusVisible': {
              outline: '2px solid',
              outlineColor: 'error.main',
              outlineOffset: 2,
            },
          }}
        >
          'Logout'
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={openLogin}
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 1.5,
            px: { xs: 2, sm: 2.5 },
            '&.Mui-focusVisible': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: 2,
            },
          }}
        >
          Login
        </Button>
      )}
    </Box>
  );
};
