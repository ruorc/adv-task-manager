import { type JSX } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

import { useAuthModal } from '@/context/AuthModal';

/**
 * Standard Security Enforcement Wall. Blockades guest access matrices
 * and exposes explicit interactive routing triggers for identity authorization workflows.
 */
export const AuthWallPage = (): JSX.Element => {
  const { openLogin, openRegister } = useAuthModal();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        py: { xs: 4, md: 8 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 500,
          width: '100%',
          p: { xs: 4, sm: 5 },
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          textAlign: 'center',
          bgcolor: 'background.paper',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            p: 2,
            borderRadius: 3,
            bgcolor: 'action.hover',
            color: 'primary.main',
            mb: 3,
          }}
        >
          <ShieldOutlinedIcon sx={{ fontSize: 40 }} />
        </Box>

        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 800,
            letterSpacing: '-0.03em',
            mb: 1.5,
            fontSize: { xs: '1.75rem', sm: '2rem' },
          }}
        >
          'Authentication Required'
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 4,
            lineHeight: 1.6,
            fontSize: '0.95rem',
          }}
        >
          'You have encountered a protected workspace domain checkpoint. Sign in
          to your active supervisor profile or register a decentralized identity
          node to synchronize task tracking streams.'
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            justifyContent: 'center',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disableElevation
            onClick={openLogin}
            startIcon={<LoginOutlinedIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: 2,
              py: 1.5,
              '&.Mui-focusVisible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: 2,
              },
            }}
          >
            'Sign In Profile'
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            size="large"
            fullWidth
            onClick={openRegister}
            startIcon={<GroupAddOutlinedIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: 2,
              py: 1.5,
              borderColor: 'divider',
              color: 'text.primary',
              '&:hover': {
                bgcolor: 'action.hover',
                borderColor: 'text.primary',
              },
              '&.Mui-focusVisible': {
                outline: '2px solid',
                outlineColor: 'text.primary',
                outlineOffset: 2,
              },
            }}
          >
            'Create Account'
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
