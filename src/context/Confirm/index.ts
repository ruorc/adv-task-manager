/**
 * Composition Root Barrel Export for the Confirm Context Module.
 * Consolidates and exposes public APIs, hooks, providers, and shared interfaces.
 * Keeps structural implementation details encapsulated away from external views.
 */

/** State provider that manages the active confirmation dialog lifecycle and promises. */
export { ConfirmProvider } from './providers/ConfirmProvider';

/** Hook providing safe, type-safe access to trigger the confirmation dialog. */
export { useConfirm } from './hooks/useConfirm';

/** TypeScript definitions for the confirmation context state and options. */
export type { ConfirmOptions, ConfirmContextType } from './types/confirm';
