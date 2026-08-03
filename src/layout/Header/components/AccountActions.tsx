import { type JSX } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useAuthModal } from '@/context/AuthModal';
import { APPLICATION_LOCALE } from '@/constants/localeConstants';

/**
 * Pure presentation contract representing access controls and session triggers.
 */
interface AccountActionsProps {
  /** Explicit verification operator full display name or null for guests */
  readonly authenticatedOperatorName: string | null;
  /** Callback proxy engineered to cleanly dispatch identity session cancellation requests */
  readonly onLogoutTrigger: () => void;
}

/**
 * Clean isolated authentication widget managing typography nodes and authorization execution triggers.
 */
export const AccountActions = ({
  authenticatedOperatorName,
  onLogoutTrigger,
}: AccountActionsProps): JSX.Element => {
  const { openLogin } = useAuthModal();

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2.5 } }}
    >
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          fontWeight: 500,
          display: { xs: 'none', sm: 'block' },
          fontSize: '0.875rem',
        }}
      >
        {authenticatedOperatorName
          ? APPLICATION_LOCALE.ui.header.account.welcomeUser(
              authenticatedOperatorName
            )
          : APPLICATION_LOCALE.ui.header.account.welcomeGuest}
      </Typography>

      {authenticatedOperatorName ? (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={onLogoutTrigger}
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
          {APPLICATION_LOCALE.ui.header.account.logout}
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={openLogin}
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 1.5,
            boxShadow: 'none',
            px: { xs: 2, sm: 3 },
            '&:hover': { boxShadow: 'none' },
            '&.Mui-focusVisible': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: 2,
            },
          }}
        >
          {APPLICATION_LOCALE.ui.header.account.login}
        </Button>
      )}
    </Box>
  );
};
