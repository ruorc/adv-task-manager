import { ThemeProvider } from './providers/ThemeProvider';
import { useTheme } from './hooks/useTheme';

import type { ThemeMode } from './types/themeTypes';

export {
  /** State provider that manages app-wide theme switching, persistence, and system synchronization. */
  ThemeProvider,
  /** Hook providing safe, type-safe access to read and update the current theme context state. */
  useTheme,
};

export type {
  /** Configuration literal type representing the user-selected theme mode ('light', 'dark', or 'system'). */
  ThemeMode,
};
