import { useState, type JSX } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { sysLogger } from '@/utils/logger/AppLogger';
import { AuthTextField } from './AuthTextField';
import { authSchema } from '../schemas/authSchema';
import { AUTH_MODES, AUTH_TEXTS } from '../constants/authModalConstants';

import type { LoginPayload, RegistrationPayload } from '@/types/appUserTypes';
import type { ReadonlyAuthForm, AuthModeType } from '../types/authFormTypes';

/**
 * Configuration properties required to initialize and manage 
 * user authentication form layouts and event workflows.
 */
interface AuthModalFormProps {
  /** The current active layout mode of the authentication form. */
  readonly currentMode: AuthModeType;
  /** Callback to toggle between login and registration modes. */
  readonly onModeToggle: (
    /** The target authentication mode to switch to. */
    mode: AuthModeType
  ) => void;
  /** Callback executed when the form is submitted successfully. */
  readonly onFormSuccess: () => void;
  /** Action handler executing registration or login based on the mode. */
  readonly onSubmitAction: {
    /** Submits the registration form data. */
    (
      /** The user registration form payload fields. */
      data: RegistrationPayload,
      /** Flag explicitly set to true for registration. */
      isRegister: true
    ): Promise<void>;
    /** Submits the login form data. */
    (
      /** The user login credential form fields. */
      data: LoginPayload,
      /** Flag explicitly set to false for login. */
      isRegister: false
    ): Promise<void>;
  };
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

    try {
      if (isRegisterMode) {
        await onSubmitAction(data as RegistrationPayload, true);
      } else {
        await onSubmitAction(data as LoginPayload, false);
      }
      
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
