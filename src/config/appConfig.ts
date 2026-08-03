/**
 * Technical identifier title applied across root headers and document metadata boundaries.
 */
export const APPLICATION_NAME = 'Advanced Task Manager 🚀' as const;

/**
 * Chronological calendar year specifying when the core application repository was initially established.
 * Globally used across legal and presentation layers to compile copyright ranges.
 */
export const PROJECT_FOUNDATION_YEAR = 2026 as const;

/**
 * Global environment compilation flag identifying if the bundle is executing inside a production matrix.
 * Drives internal pipeline optimizations and telemetry logging strictness levels.
 * Note: `import.meta.env.PROD` is automatically injected by Vite at build time
 * based on the active mode configuration (--mode production/development).
 */
export const isProduction = Boolean(import.meta.env?.PROD);
