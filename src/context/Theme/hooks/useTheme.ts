import { useContext } from 'react';

import { ThemeContext } from '../context/ThemeContext';

import type { ThemeContextType } from '../types/theme';

/**
 * Safe consumer hook providing direct type-safe access to the global active theme context space.
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      '[ThemeContext Error]: useTheme must be used within a ThemeProvider.'
    );
  }

  return context;
};
