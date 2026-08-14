import type { BaseServiceLogger } from '../types/firestoreTypes';

/**
 * Centralized exception parser isolating explicit state details from public interfaces.
 * Takes the collection name, the reference operation name, the trapped exception metadata,
 * the active telemetry logger stream, and an optional unique target record identifier.
 * Always terminates execution by throwing a user-safe Error.
 */
export function handleFirestoreError(
  collectionName: string,
  operation: string,
  error: unknown,
  logger: BaseServiceLogger,
  contextId?: string
): never {
  const contextInfo = contextId ? ` for ID [${contextId}]` : '';
  const technicalMessage =
    error instanceof Error ? error.message : String(error);

  logger.error(
    `Operational failure during [${operation}] in [${collectionName}]${contextInfo}. Internal error: ${technicalMessage}`,
    error
  );

  throw new Error(
    `Database operation [${operation}] failed on [${collectionName}]. Please try again later.`
  );
}
