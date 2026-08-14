import { useState, type JSX } from 'react';
import { Outlet } from 'react-router';
import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material';

import { WorkspacesSidebar } from './context/Sidebar/WorkspacesSidebar';
import { WorkspacesSubHeader } from './components/WorkspacesSubHeader';
import { SIDEBAR_WIDTH } from './constants/constants';

/**
 * Structural layout component encompassing the entire Workspaces domain.
 * Integrates a persistent sticky side navigation panel, a responsive mobile drawer,
 * a contextual sub-header layout, and a full-bleed viewport outlet container.
 * The global footer remains untouched in the parent layout.
 */
export const WorkspacesLayout = (): JSX.Element => {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const handleMobileDrawerToggle = (): void => {
    setIsMobileDrawerOpen((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        width: '100%',
        minHeight: '100vh',
        alignItems: 'stretch',
      }}
    >
      <Drawer
        component="aside"
        variant={isMobileScreen ? 'temporary' : 'permanent'}
        open={isMobileScreen ? isMobileDrawerOpen : undefined}
        onClose={isMobileScreen ? handleMobileDrawerToggle : undefined}
        slotProps={
          isMobileScreen ? { backdrop: { 'aria-hidden': true } } : undefined
        }
        ModalProps={isMobileScreen ? { keepMounted: true } : undefined}
        aria-label={
          isMobileScreen
            ? 'Workspaces domain mobile sidebar navigation'
            : 'Workspaces domain permanent sidebar navigation'
        }
        sx={{
          display: isMobileScreen
            ? { xs: 'block', md: 'none' }
            : { xs: 'none', md: 'block' },
          width: SIDEBAR_WIDTH,
          flexShrink: isMobileScreen ? undefined : 0,
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            boxSizing: 'border-box',
            bgcolor: 'background.paper',
            position: isMobileScreen ? undefined : 'sticky',
            top: isMobileScreen ? undefined : 0,
            height: isMobileScreen ? undefined : '100vh',
            borderRight: isMobileScreen ? undefined : '1px solid',
            borderColor: isMobileScreen ? undefined : 'divider',
          },
        }}
      >
        <WorkspacesSidebar />
      </Drawer>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minWidth: 0,
        }}
      >
        <WorkspacesSubHeader onOpenMobileSidebar={handleMobileDrawerToggle} />

        <Box
          component="main"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            bgcolor: 'background.default',
            p: 0,
            m: 0,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
