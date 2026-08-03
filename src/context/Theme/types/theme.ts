import { THEMES } from '../constants/themeConstants';

import type { ThemeMode } from '../constants/themeConstants';

export type { ThemeMode };

/**
 * Concrete visual theme variant applied at runtime.
 * Excludes 'system' and resolves strictly to the active visual palette.
 */
export type ResolvedThemeMode = Exclude<ThemeMode, typeof THEMES.SYSTEM>;

/**
 * Structural contract defining properties and payload metrics managed by the Theme context.
 */
export interface ThemeContextType {
  /** The currently selected active theme configuration preference mode */
  readonly theme: ThemeMode;
  /** Sets a fresh user interface color theme strategy mode and updates references securely */
  readonly setTheme: (theme: ThemeMode) => void;
  /** Evaluated dynamic boolean state flag indicating whether the system layout should render dark styles */
  readonly isDark: boolean;
}
