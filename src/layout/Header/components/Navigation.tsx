import { type JSX } from 'react';
import Box from '@mui/material/Box';

import { APPLICATION_LOCALE } from '@/constants/localeConstants';
import { NavigationLinkItem } from './NavigationLinkItem';

import type { NavigationItem } from '@/types/navigation';

/**
 * Presentation contract defining properties expected by the isolated navigation channel.
 */
interface NavigationProps {
  /** Comprehensive immutable array registry containing ready-to-render navigation link streams */
  readonly items: readonly NavigationItem[];
}

const BASE_BUTTON_STYLES = {
  textTransform: 'none' as const,
  fontWeight: 600,
  borderRadius: 1.5,
  color: 'text.secondary',
  px: { xs: 1.5, sm: 2 },
  '&.active': {
    color: 'primary.main',
    bgcolor: 'action.selected',
  },
  '&.Mui-focusVisible': {
    outline: '2px solid',
    outlineColor: 'primary.main',
    outlineOffset: 2,
  },
};

/**
 * Pure presentation navigation subsystem blind to routing mechanics and client-side URL pathways.
 * Dispatches active item stylings and layout compositions based entirely on higher-order provider inputs.
 */
export const Navigation = ({ items }: NavigationProps): JSX.Element => {
  return (
    <Box
      component="nav"
      aria-label={APPLICATION_LOCALE.ui.header.navigation.accessibility.primary}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1, sm: 2 },
        '& a.active': {
          pointerEvents: 'none',
          cursor: 'default',
        },
      }}
    >
      {items.map((item) => (
        <NavigationLinkItem
          key={item.id}
          displayLabel={item.label}
          LinkComponent={item.LinkComponent}
          sharedActionStyles={BASE_BUTTON_STYLES}
        />
      ))}
    </Box>
  );
};
