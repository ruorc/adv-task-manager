import { SnackProvider } from './providers/SnackProvider';
import { useSnack } from './hooks/useSnack';
import type { SnackContextProps } from './types/snackTypes';

export {
  /** Centralized Infrastructure Provider managing floating notification alert queues via Material UI tokens */
  SnackProvider,
  /** Safe consumer hook providing direct type-safe access to the global notification system stream */
  useSnack,
};

export type {
  /** Public structural contract specifying methods exposed by the unified notification management context tree */
  SnackContextProps,
};
