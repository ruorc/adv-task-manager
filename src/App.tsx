import { AppRouter } from '@/router/AppRouter';
import { AppProviders } from '@/providers/AppProviders';

import type { JSX } from 'react/jsx-runtime';

/**
 * Root Application Component.
 * Establishes the global execution pipeline by structuring layout context boundaries,
 * snackbar notification pipelines, modal confirmation trees, and micro-frontend routing layers.
 */
export const App = (): JSX.Element => {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
};
