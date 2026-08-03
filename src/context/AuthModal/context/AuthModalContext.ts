import { createContext } from 'react';

import type { AuthModalContextProps } from '../types/authContextTypes';

/**
 * Isolated system identity context allocation block enabling decoupled state transitions.
 */
export const AuthModalContext = createContext<
  AuthModalContextProps | undefined
>(undefined);
