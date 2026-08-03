/**
 * Global immutable application routing pathways registry.
 * Enforces compile-time literal boundaries to completely eliminate magic URL strings.
 */
export const ROUTES = Object.freeze({
  /** Primary entry root route pattern that automatically redirects to the main about landing view */
  ROOT: '/',
  /** Presentation main landing view showcasing system target benchmarks and technology matrices */
  ABOUT: '/about',
  /** Protected workspaces context view rendering operator Kanban boards dashboards */
  WORKSPACES: '/workspaces',
  /** Deep-link fallback route capturing unmapped entry attempts for systemic resets */
  NOT_FOUND: '*',
} as const);

/**
 * Type safety helper representing any valid layout route definition template from the ROUTES object.
 * Resolves to the raw path patterns used strictly during route registration.
 */
export type AppRoutePattern = (typeof ROUTES)[keyof typeof ROUTES];

/**
 * Dynamic route path utility generators to prevent manual string interpolation across components.
 * Reserved for future dynamic URI pattern generation.
 */
export const routeHelpers = Object.freeze({
  /**
   * Generates a valid absolute path string for a specific book detail profile view.
   * Accepts a strict unique non-nullable string identifier matching the core Book domain entity id contract.
   * Produces a fully qualified destination route path format string like /books/123.
   */
  bookDetail: (id: string): string => `/books/${id}`,
} as const);
