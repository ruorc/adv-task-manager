import { AppLogger, sysLogger } from './AppLogger';

import type { LogContext, ModuleLogger } from './types/loggerTypes';

export {
  /** Global logger orchestration engine processing systematic diagnostic entries. */
  AppLogger,
  /** Low-level internal operational instance tracing platform infrastructure states. */
  sysLogger,
};

export type {
  /** Structured contextual metadata assigned to diagnostic log records. */
  LogContext,
  /** Logger client interface restricted to a single application module context. */
  ModuleLogger,
};
