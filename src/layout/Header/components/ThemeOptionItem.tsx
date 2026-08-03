import { type ComponentType, type JSX } from 'react';
import { type SvgIconProps } from '@mui/material/SvgIcon';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';

import type { ThemeMode } from '@/context/Theme';

/**
 * Structural contract defining interface configurations for an individual theme selection menu node.
 */
interface ThemeOptionItemProps {
  /** The compile-time immutable literal identifier representing the item targeted theme strategy */
  readonly themeOptionValue: ThemeMode;
  /** Primary human-readable title label displayed to the operator */
  readonly optionLabel: string;
  /** Dynamic indicator flag verifying if this option matches the currently active system theme configuration */
  readonly isOptionSelected: boolean;
  /** Reusable Material UI SVG icon component class designated for visual grouping */
  readonly IconComponent: ComponentType<SvgIconProps>;
  /** Callback dispatcher executing layout mutations upon explicit operator interaction triggers */
  readonly onSelectTrigger: (targetTheme: ThemeMode) => void;
  /** Direct closure handler designed to cleanly terminate the active menu popover state */
  readonly onCloseMenuTrigger: () => void;
  /** SHARED performance layout cache referencing child element text sub-properties */
  readonly slotTextProps: {
    /** Target sub-component slot layout configuration mapping for the primary string node */
    readonly primary: {
      /** Typography structural token variant enforced across options */
      readonly variant: 'body2';
      /** Numeric scale metric controlling the primary typography weight quotient */
      readonly fontWeight: number;
    };
  };
}

/**
 * Isolated structural view snippet rendering a standardized accessible Material UI list menu node.
 */
export const ThemeOptionItem = ({
  themeOptionValue,
  optionLabel,
  isOptionSelected,
  IconComponent,
  onSelectTrigger,
  onCloseMenuTrigger,
  slotTextProps,
}: ThemeOptionItemProps): JSX.Element => {
  const handleItemClickAction = (): void => {
    onSelectTrigger(themeOptionValue);
    onCloseMenuTrigger();
  };

  return (
    <MenuItem
      onClick={handleItemClickAction}
      selected={isOptionSelected}
      disabled={isOptionSelected}
      sx={{ cursor: 'pointer' }}
    >
      <ListItemIcon>
        <IconComponent sx={{ fontSize: 18 }} />
      </ListItemIcon>
      <ListItemText primary={optionLabel} slotProps={slotTextProps} />
    </MenuItem>
  );
};
