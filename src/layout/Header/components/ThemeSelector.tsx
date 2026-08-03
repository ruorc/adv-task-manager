import { useState, type JSX, type MouseEvent } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import PaletteIcon from '@mui/icons-material/Palette';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';

import {
  THEMES,
  THEME_LABELS,
  THEME_LAYOUT_ID,
} from '@/context/Theme/constants/themeConstants';
import { APPLICATION_LOCALE } from '@/constants/localeConstants';
import { ThemeOptionItem } from './ThemeOptionItem';

import type { ThemeMode } from '@/context/Theme';

/**
 * Structural contract defining operations required to coordinate multi-mode theme selection layout elements.
 */
interface ThemeSelectorProps {
  /** The compile-time immutable literal identifier representing the currently operational rendering strategy */
  readonly activeThemeMode: ThemeMode;
  /** Explicit dispatcher proxy routing newly selected target theme strategies up to the provider execution pipeline */
  readonly onThemeChangeAction: (theme: ThemeMode) => void;
}

const ITEM_TEXT_SLOT_PROPS = {
  primary: {
    variant: 'body2' as const,
    fontWeight: 600,
  },
};

const THEME_CONFIGURATION_REGISTRY = [
  {
    value: THEMES.LIGHT,
    label: THEME_LABELS[THEMES.LIGHT],
    Icon: LightModeIcon,
  },
  {
    value: THEMES.DARK,
    label: THEME_LABELS[THEMES.DARK],
    Icon: DarkModeIcon,
  },
  {
    value: THEMES.COLORFUL,
    label: THEME_LABELS[THEMES.COLORFUL],
    Icon: PaletteIcon,
  },
  {
    value: THEMES.SYSTEM,
    label: THEME_LABELS[THEMES.SYSTEM],
    Icon: SettingsBrightnessIcon,
  },
] as const;

/**
 * Renders the visual status icon element based on the active theme mode setting.
 */
const renderActiveThemeIcon = (activeThemeMode: ThemeMode): JSX.Element => {
  if (activeThemeMode === THEMES.DARK) {
    return <DarkModeIcon sx={{ fontSize: 20 }} />;
  }

  if (activeThemeMode === THEMES.LIGHT) {
    return <LightModeIcon sx={{ fontSize: 20 }} />;
  }

  if (activeThemeMode === THEMES.COLORFUL) {
    return <PaletteIcon sx={{ fontSize: 20 }} />;
  }

  return <SettingsBrightnessIcon sx={{ fontSize: 20 }} />;
};

/**
 * Scalable UI interaction trigger managing an anchored floating contextual menu list
 * supporting an infinite configuration pool of design system rendering themes.
 */
export const ThemeSelector = ({
  activeThemeMode,
  onThemeChangeAction,
}: ThemeSelectorProps): JSX.Element => {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorElement);

  const handleMenuOpenTrigger = (event: MouseEvent<HTMLElement>): void => {
    setAnchorElement(event.currentTarget);
  };

  const handleMenuCloseSequence = (): void => {
    setAnchorElement(null);
  };

  return (
    <>
      <IconButton
        onClick={handleMenuOpenTrigger}
        color="inherit"
        aria-label={
          APPLICATION_LOCALE.ui.header.themeSelector.accessibility.openMenu
        }
        aria-controls={isMenuOpen ? 'theme-configuration-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? 'true' : undefined}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1.5,
          p: 1,
          cursor: 'pointer',
          '&.Mui-focusVisible': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: 2,
          },
        }}
      >
        {renderActiveThemeIcon(activeThemeMode)}
      </IconButton>

      <Menu
        id={THEME_LAYOUT_ID}
        anchorEl={anchorElement}
        open={isMenuOpen}
        onClose={handleMenuCloseSequence}
        disableScrollLock
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              borderRadius: 2,
              boxShadow: 3,
              border: '1px solid',
              borderColor: 'divider',
              minWidth: 150,
            },
          },
        }}
      >
        {THEME_CONFIGURATION_REGISTRY.map((option) => (
          <ThemeOptionItem
            key={option.value}
            themeOptionValue={option.value}
            optionLabel={option.label}
            IconComponent={option.Icon}
            isOptionSelected={activeThemeMode === option.value}
            onSelectTrigger={onThemeChangeAction}
            onCloseMenuTrigger={handleMenuCloseSequence}
            slotTextProps={ITEM_TEXT_SLOT_PROPS}
          />
        ))}
      </Menu>
    </>
  );
};
