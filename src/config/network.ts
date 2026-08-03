import { sysLogger } from '@/utils/logger';

/**
 * Structural contract defining global HTTP and network communication thresholds.
 */
export interface NetworkConfig {
  /** Governs circuit-breaker limits before throwing connection errors to the view layer */
  readonly DEFAULT_RETRIES: number;
  /** Base latency window used to initialize exponential backoff scheduling graphs (in ms) */
  readonly DEFAULT_DELAY: number;
  /** Protects downstream rate-limiters by capping progressive backoff intervals (in ms) */
  readonly DEFAULT_MAX_DELAY: number;
  /** Enforces defensive execution barriers to prevent hanging pipeline leaks (in ms) */
  readonly TIMEOUT: number;
}

/**
 * Safe numeric parser for network configuration variables.
 * Enforces strict boundaries to prevent infinite loops, hanging connections, or setTimeout overflows.
 */
const parseNetworkValue = (
  rawValue: unknown,
  defaultValue: number,
  varName: string,
  min: number,
  max: number
): number => {
  if (rawValue === undefined || rawValue === '') {
    return defaultValue;
  }

  const parsed = Number(rawValue);

  if (Number.isNaN(parsed) || parsed < min || parsed > max) {
    sysLogger.warn(
      `[Config Warning]: Invalid ${varName} value "${String(rawValue)}". Must be a number between ${min} and ${max}. Falling back to default: ${defaultValue}.`
    );

    return defaultValue;
  }

  return parsed;
};

/**
 * Global HTTP and Network transport layer configuration parameters.
 * Routes all active network parameters through a safe environment fallback matrix.
 */
export const NETWORK_CONFIG: NetworkConfig = Object.freeze({
  DEFAULT_RETRIES: parseNetworkValue(
    import.meta.env.VITE_API_RETRIES,
    2,
    'VITE_API_RETRIES',
    1,
    5
  ),

  DEFAULT_DELAY: parseNetworkValue(
    import.meta.env.VITE_API_DELAY,
    1000,
    'VITE_API_DELAY',
    100,
    10000
  ),

  DEFAULT_MAX_DELAY: parseNetworkValue(
    import.meta.env.VITE_API_MAX_DELAY,
    10000,
    'VITE_API_MAX_DELAY',
    1000,
    60000
  ),

  TIMEOUT: parseNetworkValue(
    import.meta.env.VITE_API_TIMEOUT,
    15000,
    'VITE_API_TIMEOUT',
    1000,
    120000
  ),
});
