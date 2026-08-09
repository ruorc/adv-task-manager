import type { LogConfig, LogLevel } from '@/config/logger';

/**
 * Shared configuration presets and operational severity levels
 * for the logger application module.
 */
export type {
  /** Configuration settings object defining global logger behavior. */
  LogConfig,
  /** Allowed severity thresholds for classifying application log events. */
  LogLevel,
};

/**
 * Structured contextual metadata assigned to diagnostic log records
 * for telemetry monitoring.
 */
export interface LogContext {
  /** The specific application module or layer emitting the log. */
  readonly module?: string;
  /** Key-value metadata tags applied to index and filter logs. */
  readonly tags?: Readonly<Record<string, string | number | boolean>>;
  /** Dynamic structured payload properties capturing runtime execution parameters. */
  readonly [key: string]: unknown;
}

/**
 * Logger client interface restricted to a single application
 * module execution boundary.
 */
export interface ModuleLogger {
  /** Logs standard system behavior and milestone execution checkpoints. */
  readonly info: (
    /** The main description message text for the log entry. */
    message: string,
    /** Optional context attributes omitting the predefined module name. */
    context?: Omit<LogContext, 'module'>
  ) => void;

  /** Logs non-fatal unexpected anomalies or system degradation warnings. */
  readonly warn: (
    /** The main description message text for the log entry. */
    message: string,
    /** Optional context attributes omitting the predefined module name. */
    context?: Omit<LogContext, 'module'>
  ) => void;

  /** Logs critical application errors and tracking exceptions. */
  readonly error: (
    /** The main description message text for the log entry. */
    message: string,
    /** The raw error metadata, instance, or unknown exception object. */
    error?: unknown,
    /** Optional context attributes omitting the predefined module name. */
    context?: Omit<LogContext, 'module'>
  ) => void;
}
