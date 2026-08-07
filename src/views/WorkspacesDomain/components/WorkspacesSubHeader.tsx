import { type JSX } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

/**
 * Structural contract defining properties expected by the WorkspacesSubHeader component.
 */
interface WorkspacesSubHeaderProps {
  /** Callback action triggering the mobile sidebar drawer expansion */
  readonly onOpenMobileSidebar: () => void;
}

/**
 * Structural presentation component rendering the sticky sub-header control panel
 * within the Workspaces domain view.
 */
export const WorkspacesSubHeader = ({
  onOpenMobileSidebar,
}: WorkspacesSubHeaderProps): JSX.Element => {
  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar - 1,
        flexShrink: 0,
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: { xs: 2, sm: 3 },
          minHeight: 64,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton
            color="inherit"
            aria-label="Open workspaces navigation sidebar"
            edge="start"
            onClick={onOpenMobileSidebar}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Здесь располагаются остальные элементы подшапки */}
        </Box>
      </Toolbar>
    </Box>
  );
};
