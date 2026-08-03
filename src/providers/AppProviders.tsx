import { type JSX, type ReactNode } from 'react';

import { AuthProvider } from '@/context/Auth';
import { ThemeProvider } from '@/context/Theme';
import { ConfirmProvider } from '@/context/Confirm';
import { SnackProvider } from '@/context/Snack';
import { AuthModalProvider } from '@/context/AuthModal';

/**
 * Structural communication contract specifying properties required to initialize
 * the unified application orchestration pipeline.
 */
interface AppProvidersProps {
  /** The nested tree root component tree cluster wrapped inside the global state matrix */
  readonly children: ReactNode;
}

/**
 * Unified application infrastructure root coordinator.
 * Composes all global context domains into a singular flat component node.
 */
export const AppProviders = ({ children }: AppProvidersProps): JSX.Element => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ConfirmProvider>
          <SnackProvider>
            <AuthModalProvider>{children}</AuthModalProvider>
          </SnackProvider>
        </ConfirmProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};
