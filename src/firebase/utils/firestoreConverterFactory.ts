import type {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';

import type {
  BaseServiceLogger,
  JoiSchemaValidator,
} from '../types/firestoreTypes';
import type { ServerKanbanEntities } from '@/types/appKanbanTypes';

/**
 * Decoupled factory assembling strongly typed Firestore converters backed by Joi runtimes.
 * Extracts operational dependencies for isolated utility tracking and test suite execution
 * using the provided collection name, schema validator, and application logger.
 *
 * This factory configures an isolated Firestore domain translator instance based on the
 * baseline Firestore storage folder coordinates, an active structural constraints rule evaluator,
 * and a telemetry sync destination target.
 */
export function createFirestoreConverter<T extends { uid: string }>(
  collectionName: string,
  schema: JoiSchemaValidator<T>,
  logger: BaseServiceLogger
): FirestoreDataConverter<T> {
  return {
    /**
     * Automatically hooks into write pipelines to map array entry structures back into
     * dictionaries, validating state integrity using Joi before saving to Firestore.
     *
     * Expects a runtime entity state emitting from client components and produces
     * a raw schema-compliant Firestore document data payload.
     */
    toFirestore: (modelObject: T): DocumentData => {
      const dataToValidate = { ...modelObject };

      if (
        'assignees' in dataToValidate &&
        Array.isArray(dataToValidate.assignees)
      ) {
        (dataToValidate as Record<string, unknown>).assignees =
          Object.fromEntries(dataToValidate.assignees);
      }

      const { error, value } = schema.validate(dataToValidate, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        const errorMessages = error.details.map((d) => d.message).join(', ');

        logger.error(
          `Validation failed inside [${collectionName}]: ${errorMessages}`,
          new Error(errorMessages)
        );

        throw new Error(`Invalid payload structure: ${errorMessages}`);
      }

      return value as DocumentData;
    },

    /**
     * Automatically hooks into fetch query sequences to convert database dictionary mappings
     * back into presentation-friendly arrays while verifying structural record constraints.
     *
     * Processes an active immutable snapshot coming from firestore nodes and outputs
     * a polished model interface projection ready for form integration.
     */
    fromFirestore: (snapshot: QueryDocumentSnapshot): T => {
      const rawData = snapshot.data();
      const { error, value } = schema.validate(rawData, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        const errorMessages = error.details.map((d) => d.message).join(', ');

        logger.error(
          `Corrupted document in [${collectionName}] for ID [${snapshot.id}]: ${errorMessages}`,
          new Error(errorMessages)
        );

        throw new Error(`Data validation failed for fetched document.`);
      }

      const validatedEntity = value as unknown as ServerKanbanEntities;

      if (
        validatedEntity.assignees &&
        typeof validatedEntity.assignees === 'object' &&
        !Array.isArray(validatedEntity.assignees)
      ) {
        (validatedEntity as Record<string, unknown>).assignees = Object.entries(
          validatedEntity.assignees
        );
      }

      return validatedEntity as unknown as T;
    },
  };
}
