/**
 * Static constant metric defining the fixed structural width of the workspaces side navigation drawer.
 */
export const SIDEBAR_WIDTH = 256;

/**
 * Selection criteria flags specifying the filter criteria applied to the workspace boards layout dashboard.
 */
export const BoardFilterModeName = {
  /** Filter mode showcasing all available workspace board elements. */
  ALL: 'ALL',
  /** Filter mode limiting visualization strictly to boards created by the current operator. */
  MY_BOARDS: 'MY_BOARDS',
  /** Filter mode restricting view to elements shared with the current profile identity. */
  SHARED_ACCESS: 'SHARED_ACCESS',
} as const;

/**
 * Extracted union type representing valid application entity categories.
 */
export type BoardFilterModeType =
  (typeof BoardFilterModeName)[keyof typeof BoardFilterModeName];
