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
  /** Responsive breakpoint matcher checking if the viewport matches mobile/tablet screen metrics */
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('md'));

  /** Reactive state flag managing temporary mobile drawer visibility */
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  /** Command handler toggling the open/close state of the mobile navigation drawer */
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
      {isMobileScreen ? (
        <Drawer
          component="aside"
          slotProps={{ backdrop: { 'aria-hidden': true } }}
          aria-label="Workspaces domain mobile sidebar navigation"
          variant="temporary"
          open={isMobileDrawerOpen}
          onClose={handleMobileDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: SIDEBAR_WIDTH,
              boxSizing: 'border-box',
              bgcolor: 'background.paper',
            },
          }}
        >
          <WorkspacesSidebar />
        </Drawer>
      ) : (
        <Drawer
          component="aside"
          aria-label="Workspaces domain permanent sidebar navigation"
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: SIDEBAR_WIDTH,
              boxSizing: 'border-box',
              position: 'sticky',
              top: 0,
              height: '100vh',
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}
        >
          <WorkspacesSidebar />
        </Drawer>
      )}

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
