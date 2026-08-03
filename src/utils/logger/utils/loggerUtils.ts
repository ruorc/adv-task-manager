const STANDARD_ERROR_KEYS: ReadonlySet<string> = new Set([
  'name',
  'message',
  'stack',
]);

/**
 * Extracts un-enumerable and custom data properties added to custom Error instances.
 */
export const extractErrorDetails = (error: Error): Record<string, unknown> => {
  const details: Record<string, unknown> = {};

  for (const key of Object.getOwnPropertyNames(error)) {
    if (!STANDARD_ERROR_KEYS.has(key)) {
      details[key] = (error as unknown as Record<string, unknown>)[key];
    }
  }

  return details;
};

/**
 * Safely stringifies payloads while stripping circular references to prevent JSON crashes.
 */
export const safeJsonStringify = (value: unknown): string => {
  const seen = new WeakSet();

  return JSON.stringify(value, (_key, val) => {
    if (typeof val === 'object' && val !== null) {
      if (seen.has(val)) {
        return '[Circular]';
      }

      seen.add(val);
    }

    return val;
  });
};
