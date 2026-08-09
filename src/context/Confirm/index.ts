import { ConfirmProvider } from './providers/ConfirmProvider';
import { useConfirm } from './hooks/useConfirm';

import type { ConfirmOptions, ConfirmContextType } from './types/confirmTypes';

export {
  /** State provider that manages the active confirmation dialog lifecycle and promises. */
  ConfirmProvider,
  /** Hook providing safe, type-safe access to trigger the confirmation dialog. */
  useConfirm,
};

export type {
  /** Options configuration payload for customizing the confirmation dialog look and behavior. */
  ConfirmOptions,
  /** TypeScript definition for the internal confirmation state and context action handlers. */
  ConfirmContextType,
};
