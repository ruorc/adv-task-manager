import { useEffect, useState, type JSX, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';

import { auth } from '@/firebase/config';
import { sysLogger } from '@/utils/logger';
import { firebaseAuthService } from '@/firebase/services/FirebaseAuthService';
import { AuthContext } from '../context/AuthContext';

import type { AuthContextProps } from '../types/types';

const logger = sysLogger.forModule('AuthProvider');

/**
 * Centralized Infrastructure Provider managing global core firebase authentication session pipelines.
 */
export const AuthProvider = ({
  children,
}: {
  readonly children: ReactNode;
}): JSX.Element => {
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    /**
     * Establishes a persistent realtime observer channel tracking cloud identity mutations.
     */
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsInitializing(false);

      if (firebaseUser) {
        logger.info(
          `Identity validation verified for core provider: [${firebaseUser.uid}]`
        );
      } else {
        logger.info(
          'Core identity session context synchronized as guest profile'
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const executeLogoutSequence = async (): Promise<void> => {
    try {
      await firebaseAuthService.logout();
    } catch (error) {
      logger.error(
        'Security context destruction aborted due to backend transport failure',
        error
      );
    }
  };

  const value: AuthContextProps = {
    isAuthenticated: Boolean(user),
    isInitializing,
    operatorName: user ? user.displayName || user.email : null,
    uid: user ? user.uid : null,
    nativeUser: user,
    executeLogoutSequence,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
