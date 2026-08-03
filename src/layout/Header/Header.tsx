import { type JSX } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

import { APPLICATION_NAME } from '@/config/appConfig';
import { APPLICATION_LOCALE } from '@/constants/localeConstants';
import { Navigation } from './components/Navigation';
import { ThemeSelector } from './components/ThemeSelector';
import { AccountActions } from './components/AccountActions';

import type { ThemeMode } from '@/context/Theme';
import type { NavigationRegistry } from '@/types/navigation';

/**
 * Pure presentation contract representing global header navigation configurations.
 */
interface HeaderProps {
  /** Explicit verification operator full display name or null for guests */
  readonly authenticatedOperatorName: string | null;
  /** Immutable token representative mapping indicating the active architecture design theme selection */
  readonly activeThemeMode: ThemeMode;
  /** Flag verifying whether the layout is preparing to render workspace-level sidebar controllers */
  readonly isSidebarRendered: boolean;
  /** Centralized global application navigation configurations managed by the active router */
  readonly navigationRegistry: NavigationRegistry;
  /** Callback proxy engineered to cleanly dispatch identity session cancellation requests */
  readonly onLogoutTrigger: () => void;
  /** Multi-mode transition strategy callback updating core design framework properties */
  readonly onThemeChangeAction: (theme: ThemeMode) => void;
  /** Functional command trigger shifting navigation responsive side drawers states */
  readonly onToggleSidebar: () => void;
}

/**
 * Standard un-fixed system layout banner routing system states, operational metadata,
 * and high-visibility keyboard focus responsive anchor triggers.
 */
export const Header = ({
  authenticatedOperatorName,
  activeThemeMode,
  isSidebarRendered,
  navigationRegistry,
  onLogoutTrigger,
  onThemeChangeAction,
  onToggleSidebar,
}: HeaderProps): JSX.Element => {
  const { rootLink: LogoLinkComponent, links } = navigationRegistry;

  return (
    <AppBar
      position="static"
      elevation={0}
      component="header"
      sx={{
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
          {isSidebarRendered && (
            <IconButton
              color="inherit"
              aria-label={
                APPLICATION_LOCALE.ui.header.accessibility.openSidebar
              }
              edge="start"
              onClick={onToggleSidebar}
              sx={{ display: { md: 'none' }, mr: 0.5 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <LogoLinkComponent>
            {({ isActive }) => (
              <ButtonBase
                focusRipple={!isActive}
                disabled={isActive}
                aria-label={
                  isActive
                    ? undefined
                    : `${APPLICATION_NAME} - ${APPLICATION_LOCALE.ui.header.accessibility.logoLabel}`
                }
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  borderRadius: 1.5,
                  p: 0.5,
                  transition: 'background-color 0.2s ease',
                  ...(isActive
                    ? {
                        cursor: 'default',
                        pointerEvents: 'none',
                      }
                    : {
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                        '&.Mui-focusVisible': {
                          outline: '2px solid',
                          outlineColor: 'primary.main',
                          outlineOffset: 3,
                        },
                      }),
                }}
              >
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
                  }}
                >
                  {APPLICATION_NAME}
                </Typography>
              </ButtonBase>
            )}
          </LogoLinkComponent>

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
            onThemeChangeAction={onThemeChangeAction}
          />
          <AccountActions
            authenticatedOperatorName={authenticatedOperatorName}
            onLogoutTrigger={onLogoutTrigger}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
