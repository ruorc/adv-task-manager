/** Global configuration routing pathways registry mapping raw system locations. */
export const ROUTES = Object.freeze({
  /** The primary core index path mapping root landing parameters. */
  ROOT: '/',
  /** The main application info presentation landing overview path. */
  ABOUT: '/about',
  /** The protected workspace dashboard board aggregator portal view. */
  WORKSPACES: '/workspaces',
  /** The deep location path routing framework parameters targeting unique boards. */
  BOARD_DETAIL: '/workspaces/boards/:boardId',
  /** The localized specific card holder layout nested path. */
  COLUMN_DETAIL: '/workspaces/columns/:columnId',
  /** The definitive execution task summary profiling workspace view path. */
  TASK_DETAIL: '/workspaces/tasks/:taskId',
  /** The error fallback catchall redirection destination route layout path. */
  NOT_FOUND: '*',
});

/** Union collection of valid string literals mapped from the application routing system registry. */
export type AppRoutePattern = (typeof ROUTES)[keyof typeof ROUTES];

/** Dynamic compilation utility functions generating valid system navigation location paths. */
export const routeHelpers = Object.freeze({
  /** Builds the runtime client path pattern for a board view. */
  boardDetail: (
    /** The target identification key string value of the active board. */
    boardId: string
  ): string => `/workspaces/boards/${boardId}`,
  /** Builds the runtime client path pattern for a column view. */
  columnDetail: (
    /** The target identification key string value of the active column. */
    columnId: string
  ): string => `/workspaces/columns/${columnId}`,
  /** Builds the runtime client path pattern for a task view. */
  taskDetail: (
    /** The target identification key string value of the active task. */
    taskId: string
  ): string => `/workspaces/tasks/${taskId}`,
});
