import { type JSX, type ReactNode, useCallback } from 'react';

import { GenericAuthProvider } from '@/context/Auth';
import { ThemeProvider } from '@/context/Theme';
import { ConfirmProvider } from '@/context/Confirm';
import { SnackProvider } from '@/context/Snack';
import { AuthModalProvider, type ReadonlyAuthForm } from '@/context/AuthModal';
import { firebaseAuthService } from '@/firebase/services/FirebaseAuthService';

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
 * Composes all global context domains into a singular flat component node.
 */
export const AppProviders = ({ children }: AppProvidersProps): JSX.Element => {
  const handleAuthSubmission = useCallback(
    async (data: ReadonlyAuthForm, isRegister: boolean): Promise<void> => {
      if (isRegister) {
        await firebaseAuthService.register(data);
      } else {
        await firebaseAuthService.login(data);
      }
    },
    []
  );

  return (
    <GenericAuthProvider authService={firebaseAuthService}>
      <ThemeProvider>
        <ConfirmProvider>
          <SnackProvider>
            <AuthModalProvider onSubmitAction={handleAuthSubmission}>
              {children}
            </AuthModalProvider>
          </SnackProvider>
        </ConfirmProvider>
      </ThemeProvider>
    </GenericAuthProvider>
  );
};
