import type {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

import type { BaseServiceLogger, JoiSchemaValidator } from './types';

/**
 * Decoupled factory assembling strongly typed Firestore converters backed by Joi runtimes.
 * Extracts operational dependencies for isolated utility tracking and test suite execution
 * using the provided collection name, schema validator, and application logger.
 */
export function createFirestoreConverter<T extends { uid: string }>(
  collectionName: string,
  schema: JoiSchemaValidator<T>,
  logger: BaseServiceLogger
): FirestoreDataConverter<T> {
  return {
    toFirestore: (data: T) => data,
    fromFirestore: (snapshot: QueryDocumentSnapshot): T => {
      const rawData = snapshot.data();
      const { error, value } = schema.validate(rawData, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        const errorMessages = error.details.map((d) => d.message).join(', ');

        logger.error(
          `Corrupted document structure in [${collectionName}] for ID [${snapshot.id}]: ${errorMessages}`,
          new Error(errorMessages)
        );

        throw new Error(`Data validation failed for fetched document.`);
      }

      return value;
    },
  };
}
