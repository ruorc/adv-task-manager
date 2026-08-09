import { THEMES } from '../constants/themeConstants';

import type { ThemeMode } from '../constants/themeConstants';

export type { ThemeMode };

/**
 * Concrete visual theme variant applied at runtime.
 * Excludes 'system' and resolves strictly to the active visual palette.
 */
export type ResolvedThemeMode = Exclude<ThemeMode, typeof THEMES.SYSTEM>;

/**
 * Reactive data parameters representing the current user interface
 * color theme preference state.
 */
export interface ThemeContextState {
  /** The currently selected active theme configuration preference mode. */
  readonly theme: ThemeMode;
  /** Evaluated dynamic boolean state flag indicating whether the system layout should render dark styles. */
  readonly isDark: boolean;
}

/**
 * Action dispatchers responsible for updating and persisting
 * the application theme strategies.
 */
export interface ThemeContextActions {
  /** Sets a fresh user interface color theme strategy mode and updates references securely. */
  readonly setTheme: (
    /** The target theme appearance mode selection string. */
    theme: ThemeMode
  ) => void;
}

/**
 * Structural contract defining properties and payload metrics
 * managed by the Theme context stream.
 */
export interface ThemeContextType
  extends ThemeContextState, ThemeContextActions {}
