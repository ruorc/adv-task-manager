import { APPLICATION_NAME } from '@/config/appConfig';
import { toSlug } from '@/utils/project';

/**
 * Pure runtime theme constants serving as the core single source of truth.
 */
export const THEMES = {
  /** Renders the user interface using a light color palette. */
  LIGHT: 'light',
  /** Renders the user interface using a dark color palette. */
  DARK: 'dark',
  /** Renders the user interface using a vibrant colorful color palette. */
  COLORFUL: 'colorful',
  /** Adapts the user interface color palette automatically to the user's operating system preferences. */
  SYSTEM: 'system',
} as const;

/**
 * Inferred union type of all supported application theme modes.
 */
export type ThemeMode = (typeof THEMES)[keyof typeof THEMES];

/**
 * Local storage serialization key tracking the persistent theme selection state.
 */
export const THEME_KEY = `${toSlug(APPLICATION_NAME)}-theme` as const;

/**
 * Fallback theme applied when no user override profile exists in local storage.
 */
export const DEFAULT_THEME: ThemeMode = THEMES.SYSTEM;

/**
 * Public internationalized text token mappings for user-facing design theme options.
 * Binds directly to the centralized application global localization infrastructure.
 */
export const THEME_LABELS: Record<ThemeMode, string> = {
  light: 'Light',
  dark: 'Dark',
  colorful: 'Colorful',
  system: 'System',
};

/**
 * Unique scope identifier used to isolate layout animations for the ThemeSelector.
 */
export const THEME_LAYOUT_ID = 'app-theme' as const;

/**
 * Centralized scalable design tokens registry map coordinating semantic interface colors.
 * Dictates layout attributes and palette variations using structured layout object profiles.
 */
export const DESIGN_TOKENS = Object.freeze({
  [THEMES.LIGHT]: {
    TYPE: THEMES.LIGHT,
    PRIMARY: '#4f46e5',
    PRIMARY_SHIMMER: 'rgba(79, 70, 229, 0.06)',
    ERROR: '#dc2626',
    ERROR_SHIMMER: 'rgba(220, 38, 38, 0.06)',
    BACKGROUND_DEFAULT: '#f8fafc',
    BACKGROUND_PAPER: '#ffffff',
    DIVIDER: 'rgba(0, 0, 0, 0.08)',
  },
  [THEMES.DARK]: {
    TYPE: THEMES.DARK,
    PRIMARY: '#818cf8',
    PRIMARY_SHIMMER: 'rgba(129, 140, 248, 0.12)',
    ERROR: '#f87171',
    ERROR_SHIMMER: 'rgba(248, 113, 113, 0.12)',
    BACKGROUND_DEFAULT: '#0f172a',
    BACKGROUND_PAPER: '#1e293b',
    DIVIDER: 'rgba(255, 255, 255, 0.08)',
  },
  [THEMES.COLORFUL]: {
    TYPE: THEMES.DARK,
    PRIMARY: '#3b82f6',
    PRIMARY_SHIMMER: 'rgba(59, 130, 246, 0.20)',
    ERROR: '#ef4444',
    ERROR_SHIMMER: 'rgba(239, 68, 68, 0.20)',
    BACKGROUND_DEFAULT: '#431407',
    BACKGROUND_PAPER: '#7c2d12',
    DIVIDER: 'rgba(249, 115, 22, 0.30)',
  },
});
