import { LOG_CONFIG, LOG_LEVELS } from '@/config/logger';
import { extractErrorDetails, safeJsonStringify } from './utils/loggerUtils';
import { sendToExternalMonitoring } from './utils/telemetry';

import type {
  LogConfig,
  LogContext,
  LogLevel,
  ModuleLogger,
} from './types/loggerTypes';

/**
 * Immutable in-memory map holding numeric log priorities.
 * Private detail co-located strictly within the utility module to drive filter behaviors.
 */
const LEVEL_WEIGHTS: Record<LogLevel, number> = {
  [LOG_LEVELS.INFO.id]: 1,
  [LOG_LEVELS.WARN.id]: 2,
  [LOG_LEVELS.ERROR.id]: 3,
} as const;

/**
 * Centered application observability and diagnostics gateway.
 */
export class AppLogger {
  /** Centralized application configuration instance. */
  private readonly config: LogConfig;

  constructor(config: LogConfig = LOG_CONFIG) {
    this.config = config;
  }

  public info(message: string, context?: LogContext): void {
    this.dispatch(LOG_LEVELS.INFO.id, message, context);
  }

  public warn(message: string, context?: LogContext): void {
    this.dispatch(LOG_LEVELS.WARN.id, message, context);
  }

  public error(message: string, error?: unknown, context?: LogContext): void {
    const errorPayload =
      error instanceof Error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
            ...extractErrorDetails(error),
          }
        : error;

    this.dispatch(LOG_LEVELS.ERROR.id, message, {
      ...context,
      error: errorPayload,
    });

    if (this.config.isProduction && error) {
      sendToExternalMonitoring(message, error, context);
    }
  }

  public forModule(moduleName: string): ModuleLogger {
    return {
      info: (msg, ctx) => this.info(msg, { module: moduleName, ...ctx }),
      warn: (msg, ctx) => this.warn(msg, { module: moduleName, ...ctx }),
      error: (msg, err, ctx) =>
        this.error(msg, err, { module: moduleName, ...ctx }),
    };
  }

  private dispatch(
    level: LogLevel,
    message: string,
    context?: LogContext
  ): void {
    const activeWeight = LEVEL_WEIGHTS[level] ?? 0;
    const thresholdWeight = LEVEL_WEIGHTS[this.config.logLevel] ?? 0;

    if (activeWeight < thresholdWeight) {
      return;
    }

    const timestamp = new Date().toISOString();

    if (!this.config.isProduction) {
      // eslint-disable-next-line no-console
      const consoleMethod = console[level] ? level : 'log';
      const prefix = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

      // eslint-disable-next-line no-console
      const boundLog = console[consoleMethod].bind(console, prefix);

      if (context !== undefined) {
        boundLog(context);
      } else {
        boundLog();
      }

      return;
    }

    try {
      // eslint-disable-next-line no-console
      console.info(
        safeJsonStringify({
          timestamp,
          level: level.toUpperCase(),
          message,
          ...(context && { context }),
        })
      );
    } catch (serializeError) {
      // eslint-disable-next-line no-console
      console.info(
        JSON.stringify({
          timestamp,
          level: level.toUpperCase(),
          message: `[Serialization Failure] ${message}`,
          error:
            serializeError instanceof Error
              ? serializeError.message
              : String(serializeError),
        })
      );
    }
  }
}

export const sysLogger = new AppLogger();
