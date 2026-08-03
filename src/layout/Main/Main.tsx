import { type JSX, type ReactNode } from 'react';
import Container from '@mui/material/Container';

/**
 * Structural communication contract specifying properties required to render
 * the primary application main content layout workspace.
 */
interface MainProps {
  /** The composite React element node children nested within the central viewport container */
  readonly children: ReactNode;
}

/**
 * Global Main Content Container Component.
 * Establishes the semantic layout boundary, responsive padding matrices,
 * and maximum structural width limits for all rendered sub-views and routes.
 */
export const Main = ({ children }: MainProps): JSX.Element => {
  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        flexGrow: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        pt: { xs: 3, sm: 4, md: 5 },
        pb: { xs: 4, sm: 5, md: 6 },
        px: { xs: 2, sm: 3, md: 4 },
        '&.MuiContainer-root': {
          mx: 'auto',
        },
      }}
    >
      {children}
    </Container>
  );
};
