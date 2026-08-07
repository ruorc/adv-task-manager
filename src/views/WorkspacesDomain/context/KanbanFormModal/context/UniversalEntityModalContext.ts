import { createContext } from 'react';

import type { ModalContextValue } from '../types/types';

/**
 * React context instance providing configuration parameters and shared controls to child components inside the entity modal scope.
 */
export const EntityModalContext = createContext<ModalContextValue | null>(null);
