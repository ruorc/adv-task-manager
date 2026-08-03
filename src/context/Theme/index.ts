/**
 * Composition Root Barrel Export for the Theme Context Module.
 * Consolidates and exposes public APIs, hooks, and global state providers.
 * Keeps structural implementation details encapsulated away from external views.
 */

export { ThemeProvider } from './providers/ThemeProvider';
export { isValidTheme } from './context/ThemeContext';
export { useTheme } from './hooks/useTheme';

export type {
  ResolvedThemeMode,
  ThemeMode,
  ThemeContextType,
} from './types/theme';
