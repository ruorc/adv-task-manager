import { useState, type JSX } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { AuthModalForm } from './AuthModalForm';
import { AUTH_MODES } from '../constants/authModalConstants';

import type { AuthModalProps, AuthModeType } from '../types/authFormTypes';

/**
 * Standard Identity Orchestration Modal Container Component.
 * Orchestrates window frame structures and layout viewports.
 */
export const AuthModal = ({
  isOpen,
  onClose,
  onAuthSuccess,
  initialMode = AUTH_MODES.LOGIN,
  onSubmitAction,
}: AuthModalProps): JSX.Element => {
  const [currentMode, setCurrentMode] = useState<AuthModeType>(initialMode);

  const handleSuccessCallback = (): void => {
    if (onAuthSuccess) {
      onAuthSuccess();
    }

    onClose();
  };

  const handleCloseAndReset = (): void => {
    setCurrentMode(initialMode);
    onClose();
  };

  const isRegister = currentMode === AUTH_MODES.REGISTER;

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseAndReset}
      maxWidth="xs"
      fullWidth
      slotProps={{
        backdrop: {
          sx: { bgcolor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)' },
        },
        paper: {
          sx: {
            position: 'relative',
            borderRadius: 3.5,
            p: 1,
            boxShadow: 24,
            backgroundImage: 'none',
          },
        },
      }}
    >
      <IconButton
        aria-label="Close authentication dialog"
        onClick={handleCloseAndReset}
        size="small"
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          color: 'text.disabled',
          '&:hover': { color: 'text.primary' },
        }}
      >
        <CloseIcon sx={{ fontSize: 18 }} />
      </IconButton>
      <Box sx={{ p: 3, pt: 4 }}>
        <DialogTitle
          sx={{
            p: 0,
            fontWeight: 800,
            fontSize: '1.5rem',
            letterSpacing: '-0.02em',
            mb: 1,
          }}
        >
          {isRegister ? 'Create account' : 'Welcome back'}
        </DialogTitle>
        <Typography
          sx={{ fontSize: '0.875rem', color: 'text.secondary', mb: 3 }}
        >
          {isRegister
            ? 'Register to start managing your task tracking boards'
            : 'Sign in to access your synchronized workspace pipelines'}
        </Typography>
        <AuthModalForm
          currentMode={currentMode}
          onModeToggle={setCurrentMode}
          onFormSuccess={handleSuccessCallback}
          onSubmitAction={onSubmitAction}
        />
      </Box>
    </Dialog>
  );
};
