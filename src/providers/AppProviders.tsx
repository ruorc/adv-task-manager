import { type JSX, type ReactNode, useCallback } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import { GenericAuthProvider } from '@/context/Auth';
import { ThemeProvider } from '@/context/Theme';
import { ConfirmProvider } from '@/context/Confirm';
import { SnackProvider } from '@/context/Snack';
import { AuthModalProvider } from '@/context/AuthModal';
import { firebaseAuthService } from '@/firebase/services/FirebaseAuthService';
import { queryClient } from '@/utils/queryClient';

import type { ReadonlyAuthForm } from '@/context/AuthModal';
import type { LoginPayload, RegistrationPayload } from '@/types/appUserTypes';

/**
 * Structural communication contract specifying properties required to initialize
 * the unified application orchestration pipeline.
 */
interface AppProvidersProps {
  /** React node tree to be wrapped by the application providers. */
  readonly children: ReactNode;
}

/**
 * Unified application infrastructure root coordinator.
 * Composes all global context domains and server-state caching layers into a singular flat component node.
 */
export const AppProviders = ({ children }: AppProvidersProps): JSX.Element => {
  const handleAuthSubmission = useCallback(
    async (data: ReadonlyAuthForm, isRegister: boolean): Promise<void> => {
      if (isRegister) {
        await firebaseAuthService.register(data as RegistrationPayload);
      } else {
        await firebaseAuthService.login(data as LoginPayload);
      }
    },
    []
  );

  return (
    <GenericAuthProvider authService={firebaseAuthService}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ConfirmProvider>
            <SnackProvider>
              <AuthModalProvider onSubmitAction={handleAuthSubmission}>
                {children}
              </AuthModalProvider>
            </SnackProvider>
          </ConfirmProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GenericAuthProvider>
  );
};
