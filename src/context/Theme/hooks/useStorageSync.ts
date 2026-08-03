import { useEffect } from 'react';

import { THEME_KEY, DEFAULT_THEME } from '../constants/themeConstants';
import { isValidTheme } from '../context/ThemeContext';

import type { ThemeMode } from '../types/theme';

/**
 * Internal hook coordinating cross-tab theme state replication via storage events.
 */
export const useStorageSync = (
  setThemeState: (theme: ThemeMode) => void
): void => {
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent): void => {
      if (e.key === THEME_KEY) {
        setThemeState(isValidTheme(e.newValue) ? e.newValue : DEFAULT_THEME);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, [setThemeState]);
};
