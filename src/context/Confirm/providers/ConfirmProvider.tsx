import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type JSX,
  type ReactNode,
} from 'react';

import { ConfirmContext } from '../context/ConfirmContext';
import { ConfirmModal } from '../components/ConfirmModal';

import type { ConfirmOptions } from '../types/confirm';

/**
 * Structural contract defining properties expected by the global confirmation lifecycle coordinator.
 */
interface ConfirmProviderProps {
  /** The composite React element node children nested within the global confirm state pipeline */
  readonly children: ReactNode;
}

/**
 * Context Provider managing a centralized asynchronous confirmation lifecycle pipeline.
 * Injects a singular portal-ready instance of the accessible ConfirmModal to preserve memory allocations.
 * Manages mutable promise resolver references internally to intercept user choice vectors seamlessly.
 */
export const ConfirmProvider = ({
  children,
}: ConfirmProviderProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState<ConfirmOptions>({
    title: '',
    description: '',
  });

  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  useEffect(() => {
    return () => {
      if (resolveRef.current) {
        resolveRef.current(false);
        resolveRef.current = null;
      }
    };
  }, []);

  const handleConfirm = useCallback((): void => {
    setIsOpen(false);

    if (resolveRef.current) {
      resolveRef.current(true);
      resolveRef.current = null;
    }
  }, []);

  const handleClose = useCallback((): void => {
    setIsOpen(false);

    if (resolveRef.current) {
      resolveRef.current(false);
      resolveRef.current = null;
    }
  }, []);

  const showConfirm = useCallback(
    (options: ConfirmOptions): Promise<boolean> => {
      if (resolveRef.current) {
        resolveRef.current(false);
      }

      setModalOptions(options);
      setIsOpen(true);

      return new Promise<boolean>((resolve) => {
        resolveRef.current = resolve;
      });
    },
    []
  );

  const contextValue = useMemo(() => ({ showConfirm }), [showConfirm]);

  return (
    <ConfirmContext.Provider value={contextValue}>
      {children}

      <ConfirmModal
        isOpen={isOpen}
        title={modalOptions.title}
        description={modalOptions.description}
        confirmLabel={modalOptions.confirmLabel}
        cancelLabel={modalOptions.cancelLabel}
        isDanger={modalOptions.isDanger}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </ConfirmContext.Provider>
  );
};
