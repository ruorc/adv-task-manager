import { type JSX, type ReactNode } from 'react';
import Button from '@mui/material/Button';

/**
 * Properties for the SidebarCreateButton component.
 */
interface SidebarCreateButtonProps {
  /** The human-readable text label displayed inside the action button. */
  label: string;
  /** Graphic visual symbol or component rendered prior to the label text. */
  icon: ReactNode;
  /** Material UI semantic theme intent variant controlling background colors. */
  color: 'primary' | 'secondary' | 'success';
  /** Callback trigger invoked when the interactive layout element is clicked. */
  onClick: () => void;
}

/**
 * A standardized sidebar entry point button used to trigger creation dialog workflows for entities.
 */
export const SidebarCreateButton = ({
  label,
  icon,
  color,
  onClick,
}: SidebarCreateButtonProps): JSX.Element => {
  return (
    <Button
      variant="contained"
      color={color}
      startIcon={icon}
      sx={{ justifyContent: 'flex-start' }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
