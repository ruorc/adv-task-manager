import { useState, useCallback, useMemo, type JSX } from 'react';

import { AuthModal } from '../components/AuthModal';
import { AuthModalContext } from '../context/AuthModalContext';
import { AUTH_MODES } from '../constants/authModalConstants';

import type {
  AuthModalContextProps,
  AuthModalProviderProps,
} from '../types/authContextTypes';
import type { AuthModeType } from '../types/authFormTypes';

/**
 * Centralized Infrastructure Provider managing global authentication window visibility states.
 */
export const AuthModalProvider = ({
  children,
  onSubmitAction,
}: AuthModalProviderProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeMode, setActiveMode] = useState<AuthModeType>(AUTH_MODES.LOGIN);

  const openLogin = useCallback((): void => {
    setActiveMode(AUTH_MODES.LOGIN);
    setIsOpen(true);
  }, []);

  const openRegister = useCallback((): void => {
    setActiveMode(AUTH_MODES.REGISTER);
    setIsOpen(true);
  }, []);

  const closeAuth = useCallback((): void => {
    setIsOpen(false);
  }, []);

  const contextValue = useMemo<AuthModalContextProps>(
    () => ({ openLogin, openRegister, closeAuth }),
    [openLogin, openRegister, closeAuth]
  );

  return (
    <AuthModalContext.Provider value={contextValue}>
      {children}
      <AuthModal
        key={`global-auth-overlay-${isOpen}-${activeMode}`}
        isOpen={isOpen}
        onClose={closeAuth}
        initialMode={activeMode}
        onSubmitAction={onSubmitAction}
      />
    </AuthModalContext.Provider>
  );
};
