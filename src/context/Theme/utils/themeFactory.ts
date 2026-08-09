import { createTheme, type Theme as MuiTheme } from '@mui/material/styles';

import { DESIGN_TOKENS, THEMES } from '../constants/themeConstants';

import type { ResolvedThemeMode } from '../types/themeTypes';

/**
 * Module augmentation expanding native Material UI palette structures to support custom shimmering tokens.
 */
declare module '@mui/material/styles' {
  /**
   * Enhanced palette color interface embedded with abstract layout token extensions.
   */
  interface PaletteColor {
    /** Ultra-light transparent background tint designed for highlighted alerts and icons indicators */
    readonly shimmer?: string;
  }

  /**
   * Enhanced simple palette color options interface routing custom client design properties.
   */
  interface SimplePaletteColorOptions {
    /** Ultra-light transparent background tint designed for highlighted alerts and icons indicators */
    readonly shimmer?: string;
  }
}

/**
 * Internal compilation helper creating isolated Material UI Theme instances from static design tokens.
 */
const buildMuiTheme = (activeThemeKey: ResolvedThemeMode): MuiTheme => {
  const targetThemeTokens = DESIGN_TOKENS[activeThemeKey];

  return createTheme({
    palette: {
      mode: targetThemeTokens.TYPE,
      primary: {
        main: targetThemeTokens.PRIMARY,
        shimmer: targetThemeTokens.PRIMARY_SHIMMER,
      },
      error: {
        main: targetThemeTokens.ERROR,
        shimmer: targetThemeTokens.ERROR_SHIMMER,
      },
      background: {
        default: targetThemeTokens.BACKGROUND_DEFAULT,
        paper: targetThemeTokens.BACKGROUND_PAPER,
      },
      divider: targetThemeTokens.DIVIDER,
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: 'background-color 0.25s ease, color 0.25s ease',
          },
        },
      },
    },
  });
};

/**
 * Immutable in-memory registry map holding pre-compiled Material UI themes.
 * Prevents redundant runtime invocations of createTheme during state transitions.
 */
const MUI_THEME_CACHE: Readonly<Record<ResolvedThemeMode, MuiTheme>> =
  Object.freeze({
    [THEMES.LIGHT]: buildMuiTheme(THEMES.LIGHT),
    [THEMES.DARK]: buildMuiTheme(THEMES.DARK),
    [THEMES.COLORFUL]: buildMuiTheme(THEMES.COLORFUL),
  });

/**
 * Technical compilation factory resolving pre-compiled Material UI Theme instances.
 * Decoupled from React lifecycles to guarantee O(1) theme resolution passes.
 */
export const compileMuiThemeRegistry = (
  activeThemeKey: ResolvedThemeMode
): MuiTheme => {
  return MUI_THEME_CACHE[activeThemeKey];
};
