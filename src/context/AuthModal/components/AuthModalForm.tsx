import { useState, type JSX } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { sysLogger } from '@/utils/logger/AppLogger';
import { AuthTextField } from './AuthTextField';
import { authSchema } from '../schema/authSchema';
import { AUTH_MODES, AUTH_TEXTS } from '../constants/authModalConstants';

import type { ReadonlyAuthForm, AuthModeType } from '../types/authFormTypes';

/**
 * Properties required to initialize and manage user authentication form layouts and events.
 */
interface AuthModalFormProps {
  /** The operational layout mode determining which credential fields are visible. */
  readonly currentMode: AuthModeType;
  /** Callback executed when switching views between login and registration layouts. */
  readonly onModeToggle: (mode: AuthModeType) => void;
  /** Callback executed after successful execution of submission workflows. */
  readonly onFormSuccess: () => void;
  /** Asynchronous action handling the orchestration of authentication requests using internal form data. */
  readonly onSubmitAction: (
    data: ReadonlyAuthForm,
    isRegister: boolean
  ) => Promise<void>;
}

/**
 * A centralized form component handling user validation, layout, and rendering for login and registration processes.
 */
export const AuthModalForm = ({
  currentMode,
  onModeToggle,
  onFormSuccess,
  onSubmitAction,
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

  const handleModeToggle = (): void => {
    onModeToggle(isRegisterMode ? AUTH_MODES.LOGIN : AUTH_MODES.REGISTER);
    setSubmissionError(null);
    reset();
  };

  const handleFormSubmit = async (data: ReadonlyAuthForm): Promise<void> => {
    setSubmissionError(null);

    if (isRegisterMode && data.password !== data.confirmPassword) {
      setSubmissionError(String(AUTH_TEXTS.ERROR_MATCH));

      return;
    }

    try {
      await onSubmitAction(data, isRegisterMode);
      onFormSuccess();
      reset();
    } catch (error) {
      sysLogger.error('Authentication workflow execution failure', error);

      const message =
        error instanceof Error
          ? error.message
          : String(AUTH_TEXTS.ERROR_GENERIC);

      setSubmissionError(message);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {isRegisterMode && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <AuthTextField name="firstName" label="First name" required />
              <AuthTextField name="lastName" label="Last name" required />
            </Box>
          )}

          <AuthTextField
            name="email"
            label="Email address"
            type="email"
            required
          />

          <AuthTextField
            name="password"
            label="Secure password"
            type="password"
            required
          />

          {isRegisterMode && (
            <AuthTextField
              name="confirmPassword"
              label="Confirm password"
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
                underline="hover"
                onClick={handleModeToggle}
                sx={{
                  fontWeight: 700,
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
