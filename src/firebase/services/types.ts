/**
 * Interface for injecting logger utilities into the base service.
 */
export interface BaseServiceLogger {
  /** Log operational errors with an optional raw error payload. */
  error: (message: string, error?: unknown) => void;
  /** Optional informational or state tracking log accepting any signature structural parameters. */
  info?: (message: string, ...args: never[]) => void;
}

/**
 * Encapsulates query constraints for fetching collections.
 */
export interface CollectionQueryParams {
  /** Key-value exact match parameters. */
  filters?: Record<string, unknown>;
  /** Constraints for string prefix lookups. */
  search?: {
    /** The target document field name in Firestore. */
    field: string;
    /** The text prefix search term. */
    value: string;
  };
}

/**
 * Detailed list of structural error points container.
 */
export interface JoiErrorDetail {
  /** Human-readable validation error description. */
  message: string;
}

/**
 * Operational error payload containing structured breakdown summaries.
 */
export interface JoiErrorStructure {
  /** Detailed list of explicit structural error items. */
  details: JoiErrorDetail[];
}

/**
 * Minimal structural contract representing a Joi validation result.
 */
export interface JoiValidationResult<V> {
  /** Contains operational validation errors if any occurred. */
  error?: JoiErrorStructure;
  /** The sanitized, structured value output. */
  value: V;
}

/**
 * Configuration options controlling the validation engine execution behavior.
 */
export interface JoiValidationOptions {
  /** Indicates whether the validator should stop at the first error or collect all. */
  abortEarly: boolean;
  /** Indicates whether undocumented or unknown fields should be stripped from the output. */
  stripUnknown: boolean;
}

/**
 * Core contract enforcing abstract validation strategies via Joi.
 */
export interface JoiSchemaValidator<T> {
  /**
   * Evaluates data payloads against structural domain boundaries.
   * Takes the untrusted data block and formatting configuration options, returning a standard validation result.
   */
  validate: (
    data: unknown,
    options: JoiValidationOptions
  ) => JoiValidationResult<T>;
}
