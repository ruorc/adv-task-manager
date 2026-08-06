import { useEffect, useRef, type JSX, type ReactNode } from 'react';
import Box from '@mui/material/Box';

import { useAuth } from '@/context/Auth';
import { useSnack } from '@/context/Snack';
import { ScrollToTop } from '@/components/UI/ScrollToTop';
import { useTheme } from '@/context/Theme';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';

import type { NavigationRegistry } from '@/types/navigation';

/**
 * Structural communication contract specifying core macro-layout entry properties.
 */
interface LayoutProps {
  /** The localized rendering sub-tree cluster mapped inside the standard viewport boundaries */
  readonly children: ReactNode;
  /** Complete immutable collection containing abstract navigation configurations managed by the active router */
  readonly navigationRegistry: NavigationRegistry;
}

/**
 * Global functional layout coordinator managing adaptive responsive workspace boundaries,
 * state change effect telemetry tracking, and real-time cloud identity stream mappings.
 */
export const Layout = ({
  children,
  navigationRegistry,
}: LayoutProps): JSX.Element => {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, operatorName, executeLogoutSequence } = useAuth();
  const { showSuccessSnack, showInfoSnack } = useSnack();

  const headerTrackerRef = useRef<HTMLElement | null>(null);
  const previousThemeRef = useRef<string>(theme);
  const previousAuthRef = useRef<boolean>(isAuthenticated);

  useEffect(() => {
    if (previousAuthRef.current === isAuthenticated) return;

    const stoodValidSessionTransition = previousAuthRef.current;

    previousAuthRef.current = isAuthenticated;

    if (isAuthenticated && operatorName) {
      showSuccessSnack(`Welcome, ${operatorName}!`);
    } else if (!isAuthenticated && stoodValidSessionTransition) {
      showSuccessSnack('Session terminated successfully. Goodbye!');
    }
  }, [isAuthenticated, operatorName, showSuccessSnack]);

  useEffect(() => {
    if (previousThemeRef.current === theme) return;

    previousThemeRef.current = theme;
    showInfoSnack(`Theme preference updated to: ${theme}`);
  }, [theme, showInfoSnack]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Header
        authenticatedOperatorName={isAuthenticated ? operatorName : null}
        activeThemeMode={theme}
        navigationRegistry={navigationRegistry}
        onLogout={executeLogoutSequence}
        onThemeChange={setTheme}
      />

      <Box
        component="main"
        id="main-content"
        tabIndex={-1}
        sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}
      >
        {children}
      </Box>

      <Footer />

      <ScrollToTop targetRef={headerTrackerRef} />
    </Box>
  );
};
