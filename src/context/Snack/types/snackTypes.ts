import type { SnackSeverity } from '../constants/snackConstants';

/**
 * Compile-time union type of all supported notification severity levels.
 */
export type { SnackSeverity };

/**
 * Public structural contract specifying methods exposed by the unified notification management context tree.
 */
export interface SnackContextProps {
  /** Dispatches a standard notification banner with success severity constraints */
  readonly showSuccessSnack: (message: string) => void;
  /** Dispatches a standard notification banner with warning severity constraints */
  readonly showWarningSnack: (message: string) => void;
  /** Dispatches a standard notification banner with error severity constraints */
  readonly showErrorSnack: (message: string) => void;
  /** Dispatches a standard notification banner defaulting to informational styles */
  readonly showInfoSnack: (message: string) => void;
}
