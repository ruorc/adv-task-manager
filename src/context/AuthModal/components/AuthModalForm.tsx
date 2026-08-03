import { useState, type JSX } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { auth } from '@/firebase/config';
import { sysLogger } from '@/utils/logger/AppLogger';
import { firebaseAuthService } from '@/firebase/services/FirebaseAuthService';
import { APPLICATION_LOCALE } from '@/constants/localeConstants';
import { AuthTextField } from './AuthTextField';
import { authSchema } from '../schema/authSchema';
import {
  AUTH_MODES,
  FIREBASE_AUTH_ERRORS,
  AUTH_TEXTS,
} from '../constants/authConstants';

import type { ReadonlyAuthForm, AuthModeType } from '../types/authFormTypes';

/**
 * Structural contract defining configuration settings for the internal authentication form wizard.
 */
interface AuthModalFormProps {
  /** Reactive status flag holding active workflow visualization metrics */
  readonly currentMode: AuthModeType;
  /** Explicit callback proxy notification modifier toggling parent layout states */
  readonly onModeToggle: (mode: AuthModeType) => void;
  /** Explicit completion sequence action callback routing validated application streams back to root contexts */
  readonly onFormSuccess: () => void;
}

/**
 * Isolated Authentication Form Management Engine. Resolves validations, credential submission streams,
 * and handles localized UI mode toggling independently from the container dialog frames.
 */
export const AuthModalForm = ({
  currentMode,
  onModeToggle,
  onFormSuccess,
}: AuthModalFormProps): JSX.Element => {
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const methods = useForm<ReadonlyAuthForm>({
    resolver: joiResolver(authSchema, {
      context: { mode: currentMode },
    }),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;
  const isRegisterMode = currentMode === AUTH_MODES.REGISTER;

  /**
   * Resets local validation parameters and toggles the active identity operational workflow mode.
   */
  const handleModeToggle = (): void => {
    onModeToggle(isRegisterMode ? AUTH_MODES.LOGIN : AUTH_MODES.REGISTER);
    setSubmissionError(null);
    reset();
  };

  /**
   * Orchestrates the secure dispatch execution sequence to external identity services.
   */
  const handleFormSubmit = async (data: ReadonlyAuthForm): Promise<void> => {
    setSubmissionError(null);

    if (isRegisterMode && data.password !== data.confirmPassword) {
      setSubmissionError(String(AUTH_TEXTS.ERROR_MATCH));

      return;
    }

    try {
      if (isRegisterMode) {
        await firebaseAuthService.register(data);

        if (auth.currentUser) {
          await auth.currentUser.reload();
        }
      } else {
        await firebaseAuthService.login(data);

        if (auth.currentUser) {
          await auth.currentUser.reload();
        }
      }

      onFormSuccess();
      reset();
    } catch (error) {
      sysLogger.error(
        'Firebase cloud identity interaction failure intercepted',
        error
      );

      const nativeError = error as Error & { readonly code?: string };

      if (nativeError.code === FIREBASE_AUTH_ERRORS.EMAIL_IN_USE) {
        setSubmissionError(String(AUTH_TEXTS.ERROR_EMAIL_ALLOCATED));
      } else if (
        nativeError.code === FIREBASE_AUTH_ERRORS.INVALID_CREDENTIALS
      ) {
        setSubmissionError(String(AUTH_TEXTS.ERROR_INVALID_CREDENTIALS));
      } else {
        setSubmissionError(String(AUTH_TEXTS.ERROR_GENERIC));
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {isRegisterMode && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <AuthTextField
                name="firstName"
                label={APPLICATION_LOCALE.auth.fields.firstName}
                required
              />
              <AuthTextField
                name="lastName"
                label={APPLICATION_LOCALE.auth.fields.lastName}
                required
              />
            </Box>
          )}
          <AuthTextField
            name="email"
            label={APPLICATION_LOCALE.auth.fields.email}
            type="email"
            required
          />
          <AuthTextField
            name="password"
            label={APPLICATION_LOCALE.auth.fields.password}
            type="password"
            required
          />

          {isRegisterMode && (
            <AuthTextField
              name="confirmPassword"
              label={APPLICATION_LOCALE.auth.fields.confirmPassword}
              type="password"
              required
            />
          )}

          {submissionError && (
            <Typography
              sx={{
                fontSize: '0.8125rem',
                color: 'error.main',
                fontWeight: 600,
              }}
            >
              {submissionError}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disableElevation
            disabled={isSubmitting}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: 2,
              py: 1.25,
              mt: 1,
            }}
          >
            {isSubmitting
              ? AUTH_TEXTS.SUBMIT_PROCESSING
              : isRegisterMode
                ? AUTH_TEXTS.SUBMIT_REGISTER
                : AUTH_TEXTS.SUBMIT_LOGIN}
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
              {isRegisterMode
                ? AUTH_TEXTS.TOGGLE_PROMPT_REGISTER
                : AUTH_TEXTS.TOGGLE_PROMPT_LOGIN}
              <Link
                component="button"
                type="button"
                onClick={handleModeToggle}
                sx={{
                  fontWeight: 700,
                  underline: 'hover',
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  verticalAlign: 'baseline',
                  ml: 0.5,
                }}
              >
                {isRegisterMode
                  ? AUTH_TEXTS.SUBMIT_LOGIN
                  : AUTH_TEXTS.SUBMIT_REGISTER}
              </Link>
            </Typography>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
};
