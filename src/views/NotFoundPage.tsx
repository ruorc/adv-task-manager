import { useEffect, type JSX } from 'react';
import { Link } from 'react-router'; // Строго из пакета react-router v7
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Zoom from '@mui/material/Zoom';
import Container from '@mui/material/Container';
import HomeIcon from '@mui/icons-material/Home';

import { APPLICATION_LOCALE } from '@/constants/localeConstants';
import { ROUTES } from '@/routes';
import { sysLogger } from '@/utils/logger';

const logger = sysLogger.forModule('NotFoundPage');

/**
 * High-performance, accessible 404 Route Fault presentation layer.
 * Automatically dispatches diagnostics telemetry upon mount and provides intuitive
 * escape pathways back to the application operational root via react-router Link.
 */
export const NotFoundPage = (): JSX.Element => {
  useEffect(() => {
    // Automatic anonymous logging of broken URLs for analytics in production
    logger.warn('User encountered a 404 routing resolution fault', {
      tags: {
        path: window.location.pathname,
        referrer: document.referrer || 'direct',
      },
    });
  }, []);

  return (
    <Box
      component="main"
      id="main-content"
      tabIndex={-1}
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        transition: 'background-color 0.25s ease, color 0.25s ease',
        px: 3,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: { xs: 3, sm: 4 },
          }}
        >
          <Zoom in timeout={600}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '5.5rem', sm: '8.5rem' },
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: '-0.05em',
                color: 'primary.main',
                textShadow: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '0 8px 32px rgba(129, 140, 248, 0.15)'
                    : '0 8px 32px rgba(79, 70, 229, 0.1)',
              }}
            >
              404
            </Typography>
          </Zoom>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.5rem', sm: '2rem' },
              }}
            >
              {APPLICATION_LOCALE.pages.notFound.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                maxWidth: '45ch',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              {APPLICATION_LOCALE.pages.notFound.description}
            </Typography>
          </Box>

          <Button
            component={Link}
            to={ROUTES.ROOT}
            variant="contained"
            color="primary"
            size="large"
            startIcon={<HomeIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              px: 4,
              py: 1.5,
              boxShadow: 3,
              '&.Mui-focusVisible': {
                outline: '3px solid',
                outlineColor: 'primary.dark',
                outlineOffset: 2,
              },
            }}
          >
            {APPLICATION_LOCALE.pages.notFound.backHomeButtonLabel}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
