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
  /** Structural workspace detail pattern rendering layout boundaries for a specific board */
  BOARD_DETAIL: '/workspaces/boards/:boardId',
  /** Nested column profile template rendering localized card lists inside a single board */
  COLUMN_DETAIL: '/workspaces/columns/:columnId',
  /** Deep-link task node template tracking final execution details, briefs and ownership metrics */
  TASK_DETAIL: '/workspaces/tasks/:taskId',
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
 */
export const routeHelpers = Object.freeze({
  /**
   * Compiles a valid client-side navigation pathway directly targeting a unique board view.
   */
  boardDetail: (boardId: string): string => `/workspaces/boards/${boardId}`,
  /**
   * Compiles a valid client-side navigation pathway directly targeting a unique nested column view.
   */
  columnDetail: (columnId: string): string => `/workspaces/columns/${columnId}`,
  /**
   * Compiles a valid client-side navigation pathway directly targeting the final task profile execution page.
   */
  taskDetail: (taskId: string): string => `/workspaces/tasks/${taskId}`,
} as const);
