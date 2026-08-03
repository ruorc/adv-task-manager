import type { LogContext } from '../types/loggerTypes';

/**
 * External telemetry bridge execution layer (e.g., Sentry, Bugsnag, Datadog).
 */
export const sendToExternalMonitoring = (
  _message: string,
  _error: unknown,
  _context?: LogContext
): void => {
  try {
    // Sentry.captureException(_error instanceof Error ? _error : new Error(_message));
  } catch (telemetryError) {
    // eslint-disable-next-line no-console
    console.info('Telemetry transmission pipeline failure:', telemetryError);
  }
};
