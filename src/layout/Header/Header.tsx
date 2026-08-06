import { type JSX } from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { APPLICATION_NAME } from '@/config/appConfig';
import { Navigation } from './components/Navigation';
import { ThemeSelector } from './components/ThemeSelector';
import { AccountActions } from './components/AccountActions';
import { NavigationLinkItem } from './components/NavigationLinkItem';

import type { ThemeMode } from '@/context/Theme';
import type { NavigationRegistry } from '@/types/navigation';

/**
 * Pure presentation contract representing global header navigation configurations
 * and operational action triggers.
 */
interface HeaderProps {
  /** Explicit verification operator full display name or null for guest sessions */
  readonly authenticatedOperatorName: string | null;
  /** Immutable token representative mapping indicating the active architecture design theme selection */
  readonly activeThemeMode: ThemeMode;
  /** Centralized global application navigation configurations managed by the active router */
  readonly navigationRegistry: NavigationRegistry;
  /** Callback proxy engineered to cleanly dispatch identity session cancellation requests */
  readonly onLogout: () => void;
  /** Multi-mode transition strategy callback updating core design framework properties */
  readonly onThemeChange: (theme: ThemeMode) => void;
}

/**
 * Shared presentation styling configuration governing branding logo button elements
 * within the primary header navigation tier.
 */
const LOGO_BUTTON_STYLES = {
  textTransform: 'none' as const,
  fontWeight: 600,
  borderRadius: 1.5,
  color: 'text.primary',
  px: { xs: 1, sm: 1.5 },
  '&.active': {
    color: 'text.primary',
    bgcolor: 'transparent',
  },
  '&.Mui-focusVisible': {
    outline: '2px solid',
    outlineColor: 'primary.main',
    outlineOffset: 3,
  },
};

/**
 * static system layout banner routing system states, operational metadata,
 * brand identity vectors, and high-visibility keyboard focus responsive anchor triggers.
 */
export const Header = ({
  authenticatedOperatorName,
  activeThemeMode,
  navigationRegistry,
  onLogout: onLogout,
  onThemeChange: onThemeChange,
}: HeaderProps): JSX.Element => {
  const { rootLink: LogoLinkComponent, links } = navigationRegistry;

  return (
    <AppBar
      position="static"
      elevation={0}
      component="header"
      sx={{
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: { xs: 2, sm: 3 },
          minHeight: { xs: 64, sm: 70 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <NavigationLinkItem
            LinkComponent={LogoLinkComponent}
            sharedActionStyles={LOGO_BUTTON_STYLES}
            displayLabel={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TaskAltIcon
                  color="primary"
                  sx={{ fontSize: { xs: 24, sm: 28 } }}
                />
                <Typography
                  variant="h6"
                  noWrap
                  component="span"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    fontSize: { xs: '0.95rem', sm: '1.1rem' },
                    color: 'text.primary',
                    display: 'none',
                    '@media (min-width: 820px)': {
                      display: 'block',
                    },
                  }}
                >
                  {APPLICATION_NAME}
                </Typography>
              </Box>
            }
          />

          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: 'none', md: 'block' }, my: 2 }}
          />
          <Navigation items={links} />
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1, sm: 2.5 },
          }}
        >
          <ThemeSelector
            activeThemeMode={activeThemeMode}
            onThemeChange={onThemeChange}
          />
          <AccountActions
            authenticatedOperatorName={authenticatedOperatorName}
            onLogout={onLogout}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
