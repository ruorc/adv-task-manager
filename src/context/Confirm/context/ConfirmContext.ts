import { createContext } from 'react';

import type { ConfirmContextType } from '../types/confirmTypes';

/**
 * Core React Context for managing async confirmation workflows.
 * Requires a `ConfirmProvider` ancestor to supply the runtime values.
 */
export const ConfirmContext = createContext<ConfirmContextType | undefined>(
  undefined
);
