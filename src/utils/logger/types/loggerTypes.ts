import type { LogConfig, LogLevel } from '@/config/logger';

export type { LogConfig, LogLevel };

/**
 * Structured context and metadata envelope for diagnostic records.
 */
export interface LogContext {
  /**
   * Identifier of the architectural module or service originating the entry.
   */
  readonly module?: string;

  /**
   * Key-value dictionary of metrics used for analytical indexing.
   */
  readonly tags?: Readonly<Record<string, string | number | boolean>>;

  /**
   * Dynamic property dictionary for capturing arbitrary execution telemetry parameters.
   */
  readonly [key: string]: unknown;
}

/**
 * Localized logger interface bound to a specific application module boundary.
 */
export interface ModuleLogger {
  /** Tracks telemetry operational milestones or execution checkpoints. */
  readonly info: (
    message: string,
    context?: Omit<LogContext, 'module'>
  ) => void;
  /** Records recoverable application degradation signals or anomalies. */
  readonly warn: (
    message: string,
    context?: Omit<LogContext, 'module'>
  ) => void;
  /** Captures critical system state exceptions and routes them to monitoring. */
  readonly error: (
    message: string,
    error?: unknown,
    context?: Omit<LogContext, 'module'>
  ) => void;
}
