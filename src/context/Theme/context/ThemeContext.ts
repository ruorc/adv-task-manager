import { createContext } from 'react';

import { THEMES } from '../constants/themeConstants';

import type { ThemeMode, ThemeContextType } from '../types/themeTypes';

/**
 * React context storing the active client-side visual theme preference configuration profile.
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

/**
 * Type guard validation verifying if a raw storage string exactly matches permitted theme literal constraints.
 */
export const isValidTheme = (value: string | null): value is ThemeMode => {
  if (value === null || value === '') {
    return false;
  }

  return Object.values(THEMES).includes(value as ThemeMode);
};
