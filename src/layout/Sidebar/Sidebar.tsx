import { type JSX } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';

import { APPLICATION_LOCALE } from '@/constants/localeConstants';

/**
 * Structural contract defining properties expected by the adaptive workspace navigation sidebar.
 */
interface SidebarProps {
  /** Reactive state flag managing the visibility quotient of the responsive floating drawer overlay */
  readonly isMobileOpen: boolean;
  /** Direct callback strategy proxy engineered to cleanly invert layout navigation toggles */
  readonly onToggleAction: () => void;
}

const SIDEBAR_LAYOUT_WIDTH = 260;

const sidebarNavStyles = {
  width: { md: SIDEBAR_LAYOUT_WIDTH },
  flexShrink: { md: 0 },
};

const mobileDrawerStyles = {
  display: { xs: 'block', md: 'none' },
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box' as const,
    width: SIDEBAR_LAYOUT_WIDTH,
  },
};

const desktopDrawerStyles = {
  display: { xs: 'none', md: 'block' },
  height: '100%',
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box' as const,
    width: SIDEBAR_LAYOUT_WIDTH,
    position: 'static' as const,
    height: '100%',
    borderRight: '1px solid',
    borderColor: 'divider',
  },
};

/**
 * Abstract layout component rendering independent persistent desktop and temporary mobile drawers.
 * Hardens code splitting metrics by completely decoupling navigation trees from core viewport managers.
 */
export const Sidebar = ({
  isMobileOpen,
  onToggleAction,
}: SidebarProps): JSX.Element => {
  const sidebarContent = (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 700, color: 'text.secondary', mb: 2 }}
      >
        Boards Sidebar
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography
        variant="body2"
        sx={{ color: 'text.disabled', fontStyle: 'italic' }}
      >
        Active Workspace Empty Placeholder
      </Typography>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={sidebarNavStyles}
      aria-label={APPLICATION_LOCALE.ui.sidebar.accessibility.navigation}
    >
      <Drawer
        variant="temporary"
        open={isMobileOpen}
        onClose={onToggleAction}
        ModalProps={{ keepMounted: true }}
        sx={mobileDrawerStyles}
      >
        {sidebarContent}
      </Drawer>

      <Drawer variant="permanent" sx={desktopDrawerStyles} open>
        {sidebarContent}
      </Drawer>
    </Box>
  );
};
