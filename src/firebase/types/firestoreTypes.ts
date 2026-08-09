/**
 * Interface for injecting diagnostic logger utilities
 * into base application services.
 */
export interface BaseServiceLogger {
  /** Log operational errors with an optional raw error payload. */
  error: (
    /** The main description message text for the log entry. */
    message: string,
    /** The raw error metadata, instance, or unknown exception object. */
    error?: unknown
  ) => void;
  /** Optional informational or state tracking log accepting structural parameters. */
  info?: (
    /** The main description message text for the log entry. */
    message: string,
    /** Dynamic placeholder rest arguments constrained to prevent arbitrary values. */
    ...args: never[]
  ) => void;
}

/**
 * Encapsulates query filtering and lookup constraints
 * for fetching data collections.
 */
export interface CollectionQueryParams {
  /** Key-value exact match parameters used to filter database documents. */
  filters?: Record<string, unknown>;
  /** Constraints for executing string prefix lookups within a collection. */
  search?: {
    /** The target document field name inside the database collection. */
    field: string;
    /** The text prefix search term used for matching. */
    value: string;
  };
}

/**
 * Detailed container tracking a single structural validation error
 * pinpointed by the schema evaluator.
 */
export interface JoiErrorDetail {
  /** Human-readable validation error description text. */
  message: string;
}

/**
 * Operational error payload containing structured breakdown summaries
 * of schema constraint violations.
 */
export interface JoiErrorStructure {
  /** Detailed list of explicit structural validation error items. */
  details: JoiErrorDetail[];
}

/**
 * Minimal structural contract representing a generic Joi validation
 * engine execution result.
 */
export interface JoiValidationResult<V> {
  /** Contains operational validation errors if any constraint violations occurred. */
  error?: JoiErrorStructure;
  /** The sanitized, parsed, and successfully structured value output payload. */
  value: V;
}

/**
 * Configuration options controlling the validation engine runtime
 * execution and filtering behavior.
 */
export interface JoiValidationOptions {
  /** Indicates whether the validator should stop at the first error or collect all. */
  abortEarly: boolean;
  /** Indicates whether undocumented or unknown fields should be stripped from the output. */
  stripUnknown: boolean;
}

/**
 * Core contract enforcing abstract data payload validation strategies
 * via the Joi library engine.
 */
export interface JoiSchemaValidator<T> {
  /** Evaluates untrusted data payloads against strict structural domain boundaries. */
  validate: (
    /** The unverified input data payload requiring structural assessment. */
    data: unknown,
    /** Formatting configuration options governing parsing execution behavior. */
    options: JoiValidationOptions
  ) => JoiValidationResult<T>;
}
