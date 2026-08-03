import { isProduction } from './appConfig';

/**
 * Allowed application logging severity levels.
 * These constants represent the supported architectural logging levels
 * used for system observability, event routing, and metric filtering.
 */
export const LOG_LEVELS = {
  /** Tracks telemetry operational milestones or execution checkpoints. */
  INFO: { id: 'info' },
  /** Records recoverable application degradation signals or anomalies. */
  WARN: { id: 'warn' },
  /** Captures critical system state exceptions and failures. */
  ERROR: { id: 'error' },
} as const;

/**
 * Inferred union type of all allowed application logging severity levels.
 */
export type LogLevel = (typeof LOG_LEVELS)[keyof typeof LOG_LEVELS]['id'];

/**
 * Configuration schema for global application parameters.
 */
export interface LogConfig {
  /** Flag indicating if the current target environment is production. */
  readonly isProduction: boolean;
  /** The active minimum log filtering severity boundary. */
  readonly logLevel: LogLevel;
}

const isLogLevel = (value: unknown): value is LogLevel => {
  return (
    typeof value === 'string' &&
    Object.values(LOG_LEVELS).some((level) => level.id === value)
  );
};

const parseLogLevel = (rawLevel: unknown, isProd: boolean): LogLevel => {
  const defaultLevel = isProd ? LOG_LEVELS.WARN.id : LOG_LEVELS.INFO.id;

  if (rawLevel === undefined || rawLevel === '') {
    return defaultLevel;
  }

  if (!isLogLevel(rawLevel)) {
    // eslint-disable-next-line no-console
    console.warn(
      `[Config Warning]: Invalid VITE_LOG_LEVEL value "${String(rawLevel)}". Falling back to "${defaultLevel}".`
    );

    return defaultLevel;
  }

  return rawLevel;
};

/**
 * Centered configuration instance mapping environment variables to application parameters.
 * Frozen at runtime to prevent accidental configuration mutations.
 */
export const LOG_CONFIG: LogConfig = Object.freeze({
  isProduction,
  logLevel: parseLogLevel(import.meta.env.VITE_LOG_LEVEL, isProduction),
});
