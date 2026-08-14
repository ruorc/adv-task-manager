import { type JSX } from 'react';
import Button from '@mui/material/Button';

/**
 * Properties for the SidebarCreateButton component.
 */
interface SidebarCreateButtonProps {
  /** The human-readable text label displayed inside the action button. */
  readonly label: string;
  /** Graphic visual symbol or component rendered prior to the label text. */
  readonly icon: JSX.Element;
  /** Material UI semantic theme intent variant controlling background colors. */
  readonly color: 'primary' | 'secondary' | 'success';
  /** Callback trigger invoked when the interactive layout element is clicked. */
  readonly onClick: () => void;
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
      fullWidth
      aria-label={`Create new ${label.toLowerCase()}`}
      sx={{ justifyContent: 'flex-start' }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
