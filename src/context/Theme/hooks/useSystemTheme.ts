import { useSyncExternalStore } from 'react';

const subscribeToSystemTheme = (callback: () => void): (() => void) => {
  if (typeof window === 'undefined') return () => {};

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  mediaQuery.addEventListener('change', callback);

  return () => mediaQuery.removeEventListener('change', callback);
};

const getSystemThemeSnapshot = (): boolean => {
  if (typeof window === 'undefined') return false;

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const getServerThemeSnapshot = (): boolean => false;

/**
 * Internal hook encapsulating hardware operating system dark mode preference tracking.
 */
export const useSystemTheme = (): boolean => {
  return useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemThemeSnapshot,
    getServerThemeSnapshot
  );
};
