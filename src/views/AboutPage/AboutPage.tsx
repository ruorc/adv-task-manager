import { type JSX } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

import TrackChanges from '@mui/icons-material/TrackChanges';
import Layers from '@mui/icons-material/Layers';
import VerifiedUser from '@mui/icons-material/VerifiedUser';
import Terminal from '@mui/icons-material/Terminal';
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined';
import Storage from '@mui/icons-material/Storage';
import Dashboard from '@mui/icons-material/Dashboard';
import FlashOn from '@mui/icons-material/FlashOn';
import Security from '@mui/icons-material/Security';

/**
 * Isolated content node rendering detailed architectural objectives, functional mechanics,
 * and technical dependency layers powering the production-ready task orchestration sandbox.
 */
export const AboutPage = (): JSX.Element => {
  return (
    <Container maxWidth="lg" sx={{ py: 6, flexGrow: 1 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{ fontWeight: 'bold' }}
          gutterBottom
        >
          About Advanced Task Manager
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: '700px', mx: 'auto' }}
        >
          A high-performance, responsive kanban application engineered to
          streamline workflows and elevate daily organization.
        </Typography>
      </Box>

      {/* Goals Section */}
      <Box sx={{ mb: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            fontWeight: 600,
          }}
        >
          <TrackChanges fontSize="large" color="primary" /> Project Purpose &
          Goals
        </Typography>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card elevation={2} sx={{ height: '100%' }}>
              <CardContent>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    fontWeight: 'bold',
                  }}
                >
                  <VerifiedUser color="success" /> Type Safety
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Enforcing strict, end-to-end type validation across
                  components, custom hooks, and database payloads for absolute
                  runtime stability.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card elevation={2} sx={{ height: '100%' }}>
              <CardContent>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    fontWeight: 'bold',
                  }}
                >
                  <Layers color="secondary" /> State Optimization
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Decoupling asynchronous server-state queries, dynamic
                  real-time cloud data streams, and local ephemeral UI
                  interactions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card elevation={2} sx={{ height: '100%' }}>
              <CardContent>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    fontWeight: 'bold',
                  }}
                >
                  <FlashOn color="warning" /> Next-Gen Tooling
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Demonstrating native Rust-powered fast refreshes, linting
                  automated checks, and strict runtime validation layers.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mb: 8 }} />

      {/* Features & Tech Grid */}
      <Grid container spacing={6}>
        {/* Core Features */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            variant="h4"
            component="h3"
            sx={{
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              fontWeight: 600,
            }}
          >
            <Dashboard fontSize="large" color="primary" /> Core Features
          </Typography>
          <List disablePadding>
            {[
              {
                title: 'User Account Management',
                desc: 'Secure user onboarding, granular login flows, and persistent state powered by Firebase Auth.',
              },
              {
                title: 'Workspace Operations',
                desc: 'Full lifecycle CRUD operations managed efficiently on nested Boards, Columns, and Tasks.',
              },
              {
                title: 'Fluid Kanban Board',
                desc: 'Smooth drag-and-drop mechanics and column sorting utilizing native React micro-interactions.',
              },
              {
                title: 'Robust Form Controls',
                desc: 'Schema-driven fields featuring real-time client-side error handling and inline UI warnings.',
              },
              {
                title: 'Built-in Security',
                desc: 'Proactive content cleansing to guard rich-text user markup from critical script injection exploits.',
              },
            ].map((item, idx) => (
              <ListItem
                key={idx}
                disableGutters
                sx={{ alignItems: 'flex-start', mb: 2 }}
              >
                <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                  <CheckCircleOutlined color="success" fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {item.title}
                    </Typography>
                  }
                  secondary={item.desc}
                />
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* Built With (Исправленная строка 148) */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            variant="h4"
            component="h3"
            sx={{
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              fontWeight: 600,
            }}
          >
            <Terminal fontSize="large" color="primary" /> System Architecture
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            This sandbox relies on a highly performant developer stack optimized
            for lightning execution speeds and scalable maintainability:
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            <Chip
              icon={<Terminal fontSize="small" />}
              label="React 19"
              color="primary"
              variant="outlined"
            />
            <Chip
              icon={<VerifiedUser fontSize="small" />}
              label="TypeScript"
              color="primary"
              variant="outlined"
            />
            <Chip
              icon={<FlashOn fontSize="small" />}
              label="Vite 8 & Oxc Engine"
              color="secondary"
              variant="outlined"
            />
            <Chip
              icon={<Layers fontSize="small" />}
              label="TanStack Query v5"
              color="success"
              variant="outlined"
            />
            <Chip
              icon={<Storage fontSize="small" />}
              label="Firebase 12"
              color="warning"
              variant="outlined"
            />
            <Chip
              icon={<Dashboard fontSize="small" />}
              label="Material UI v9"
              variant="outlined"
            />
            <Chip
              icon={<Layers fontSize="small" />}
              label="Emotion Style"
              variant="outlined"
            />
            <Chip
              icon={<Dashboard fontSize="small" />}
              label="dnd-kit Engine"
              variant="outlined"
            />
            <Chip
              icon={<Security fontSize="small" />}
              label="React Hook Form"
              color="info"
              variant="outlined"
            />
            <Chip
              icon={<Security fontSize="small" />}
              label="Joi Schemas"
              color="info"
              variant="outlined"
            />
            <Chip
              icon={<Security fontSize="small" />}
              label="DOMPurify (XSS Protection)"
              color="error"
              variant="outlined"
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
