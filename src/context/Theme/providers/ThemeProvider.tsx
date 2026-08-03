import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type JSX,
  type ReactNode,
} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';

import {
  DEFAULT_THEME,
  DESIGN_TOKENS,
  THEME_KEY,
  THEMES,
} from '../constants/themeConstants';
import { ThemeContext, isValidTheme } from '../context/ThemeContext';
import { compileMuiThemeRegistry } from '../utils/themeFactory';
import { useSystemTheme } from '../hooks/useSystemTheme';
import { useStorageSync } from '../hooks/useStorageSync';

import type { ResolvedThemeMode, ThemeMode } from '../types/theme';

/**
 * Structural contract defining properties expected by the global application theme coordinator.
 */
export interface ThemeProviderProps {
  /** The composite React element node children nested within the visual theme boundary tree */
  readonly children: ReactNode;
}

/**
 * Context Provider encapsulating color palette theme management, hardware preferences, and storage tracking.
 * Restores persisted configurations, listens to operating system media preferences, and synchronizes cross-tab events.
 */
export const ThemeProvider = ({
  children,
}: ThemeProviderProps): JSX.Element => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return DEFAULT_THEME;

    try {
      const saved = localStorage.getItem(THEME_KEY);

      return isValidTheme(saved) ? saved : DEFAULT_THEME;
    } catch {
      return DEFAULT_THEME;
    }
  });

  const systemPrefersDark = useSystemTheme();

  useStorageSync(setThemeState);

  const activeTokensKey = useMemo<ResolvedThemeMode>(() => {
    if (theme === THEMES.SYSTEM) {
      return systemPrefersDark ? THEMES.DARK : THEMES.LIGHT;
    }

    return theme as ResolvedThemeMode;
  }, [theme, systemPrefersDark]);

  const isDark = useMemo((): boolean => {
    return DESIGN_TOKENS[activeTokensKey].TYPE === THEMES.DARK;
  }, [activeTokensKey]);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle(THEMES.DARK, isDark);
  }, [isDark]);

  useEffect(() => {
    try {
      if (theme === THEMES.SYSTEM) {
        localStorage.removeItem(THEME_KEY);
      } else {
        localStorage.setItem(THEME_KEY, theme);
      }
    } catch {
      // Storage access disabled or restricted by environment policy
    }
  }, [theme]);

  const setTheme = (newTheme: ThemeMode): void => {
    setThemeState((prevTheme) =>
      newTheme === prevTheme ? prevTheme : newTheme
    );
  };

  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
      isDark,
    }),
    [theme, isDark]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MaterialThemeProvider theme={compileMuiThemeRegistry(activeTokensKey)}>
        <CssBaseline />
        {children}
      </MaterialThemeProvider>
    </ThemeContext.Provider>
  );
};
