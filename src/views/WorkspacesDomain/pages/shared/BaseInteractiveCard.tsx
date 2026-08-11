import { type JSX } from 'react';
import { Card, CardContent } from '@mui/material';

/**
 * Operational properties governing the structural layouts and action callbacks for interactive container frames.
 */
interface BaseInteractiveCardProps {
  /** Reactive callback executed immediately when the client clicks or triggers the card container boundary. */
  readonly onClick?: () => void;
  /** Inner layout elements or typography specifications packed directly into the material frame body. */
  readonly children: React.ReactNode;
}

/**
 * Uniform visual shell component enforcing synchronized hovering behaviors and smooth layout transitions across elements.
 */
export const BaseInteractiveCard = ({
  onClick,
  children,
}: BaseInteractiveCardProps): JSX.Element => (
  <Card
    variant="outlined"
    onClick={onClick}
    sx={{
      cursor: onClick ? 'pointer' : 'default',
      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': onClick
        ? {
            boxShadow: 4,
            transform: 'translateY(-4px)',
            borderColor: 'primary.main',
            backgroundColor: 'background.default',
          }
        : {},
    }}
  >
    <CardContent>{children}</CardContent>
  </Card>
);
