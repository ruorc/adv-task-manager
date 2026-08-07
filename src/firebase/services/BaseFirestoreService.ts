import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  type QueryConstraint,
  type FirestoreDataConverter,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { handleFirestoreError } from './firestoreErrorHandler';
import { createFirestoreConverter } from './firestoreConverterFactory';
import type {
  BaseServiceLogger,
  CollectionQueryParams,
  JoiSchemaValidator,
} from './types';

/**
 * Abstract domain controller providing standard operational blueprints for individual collections.
 */
export abstract class BaseFirestoreService<T extends { uid: string }> {
  /** Root database path tracking coordinates. */
  protected abstract collectionName: string;

  /** Active validation parameters safeguarding runtime mutations. */
  protected abstract schema: JoiSchemaValidator<T>;

  /** Active downstream telemetry targets. */
  protected logger: BaseServiceLogger;

  /**
   * Builds instances ensuring fallback log strategies handle runtime gaps safely.
   * Takes a telemetry destination logger object. Falls back to console when undefined.
   */
  constructor(logger?: BaseServiceLogger) {
    this.logger = logger || {
      // eslint-disable-next-line no-console
      error: (msg, err): void => console.error(msg, err),
      // eslint-disable-next-line no-console
      info: (msg, data): void => console.log(msg, data),
    };
  }

  /**
   * Evaluates active translation adapters maps for local tracking.
   */
  protected get converter(): FirestoreDataConverter<T> {
    return createFirestoreConverter(
      this.collectionName,
      this.schema,
      this.logger
    );
  }

  /**
   * Evaluates payloads against registered validation rules under specified transaction contexts.
   */
  private validatePayload(payload: unknown, stage: 'create' | 'save'): T {
    const { error, value } = this.schema.validate(payload, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorMessages = error.details.map((d) => d.message).join(', ');

      this.logger.error(
        `Validation failed before operational step [${stage}] inside [${this.collectionName}]`,
        new Error(errorMessages)
      );

      throw new Error(`Invalid payload structure: ${errorMessages}`);
    }

    return value as T;
  }

  /**
   * Retrieves structural instances identified by target domain credentials primary key value.
   */
  public async getById(uid: string): Promise<T | null> {
    const docRef = doc(db, this.collectionName, uid).withConverter(
      this.converter
    );

    try {
      const snapshot = await getDoc(docRef);

      return snapshot.exists() ? snapshot.data() : null;
    } catch (error) {
      handleFirestoreError(
        this.collectionName,
        'getById',
        error,
        this.logger,
        uid
      );
    }
  }

  /**
   * Collects structural domain instances conforming to runtime evaluation filters config structures.
   * Falls back to full collection retrieval when inputs evaluate missing.
   */
  public async getMany(queryParams?: CollectionQueryParams): Promise<T[]> {
    try {
      const constraints: QueryConstraint[] = [];

      if (queryParams) {
        const { filters, search } = queryParams;

        if (filters) {
          Object.entries(filters).forEach(([field, value]) => {
            if (value !== undefined) {
              constraints.push(where(field, '==', value));
            }
          });
        }

        if (search && search.value.trim() !== '') {
          const { field, value } = search;

          constraints.push(where(field, '>=', value));
          constraints.push(where(field, '<=', value + '\uf8ff'));
        }
      }

      const collectionRef = collection(db, this.collectionName).withConverter(
        this.converter
      );
      const q = query(collectionRef, ...constraints);
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
    } catch (error) {
      handleFirestoreError(this.collectionName, 'getMany', error, this.logger);
    }
  }

  /**
   * Generates a new unique identifier in Firestore, inserts it into the payload,
   * validates the structured object, and persists it as a new document.
   * Takes the raw data payload omitting the unique identifier.
   */
  public async create(rawPayload: unknown): Promise<T> {
    const collectionRef = collection(db, this.collectionName);
    const newDocRef = doc(collectionRef);
    const generatedUid = newDocRef.id;

    const payloadWithUid =
      typeof rawPayload === 'object' && rawPayload !== null
        ? { ...rawPayload, uid: generatedUid }
        : { uid: generatedUid };

    /** Execute the isolated validator module which now expects uid to be present and required */
    const validatedData = this.validatePayload(payloadWithUid, 'create');
    const docRefWithConverter = newDocRef.withConverter(this.converter);

    try {
      await setDoc(docRefWithConverter, validatedData);

      return validatedData;
    } catch (firestoreError) {
      handleFirestoreError(
        this.collectionName,
        'create',
        firestoreError,
        this.logger,
        generatedUid
      );
    }
  }

  /**
   * Commits structural values validating state boundaries before operational transactions execute.
   * Strictly requires a valid identifier mapping to be provided or extracted.
   * Throws an error immediately if the identifier cannot be resolved.
   */
  public async save(rawPayload: unknown, customUid?: string): Promise<T> {
    /** Execute the isolated validator module checking existing records fields integrity */
    const validatedData = this.validatePayload(rawPayload, 'save');
    const targetUid = customUid || validatedData.uid;

    if (!targetUid) {
      this.logger.error(
        `Operational error: UID is missing during write in [${this.collectionName}]`
      );

      throw new Error(
        'Operational failure: Entity identification UID is missing.'
      );
    }

    validatedData.uid = targetUid;
    const docRef = doc(db, this.collectionName, targetUid).withConverter(
      this.converter
    );

    try {
      await setDoc(docRef, validatedData);

      return validatedData;
    } catch (firestoreError) {
      handleFirestoreError(
        this.collectionName,
        'save',
        firestoreError,
        this.logger,
        targetUid
      );
    }
  }

  /**
   * Performs granular mutation queries targeting explicit values using a partial subset updates map.
   */
  public async update(
    uid: string,
    updates: Partial<Omit<T, 'uid'>>
  ): Promise<void> {
    const docRef = doc(db, this.collectionName, uid);

    try {
      await updateDoc(docRef, updates as Record<string, unknown>);
    } catch (error) {
      handleFirestoreError(
        this.collectionName,
        'update',
        error,
        this.logger,
        uid
      );
    }
  }

  /**
   * Disposes of structural entities by targeted data element uid pointer.
   * Applies soft flag logic by default unless hardDelete execution path configuration is passed.
   */
  public async delete(
    uid: string,
    options: { hardDelete?: boolean } = {}
  ): Promise<void> {
    const docRef = doc(db, this.collectionName, uid);

    try {
      if (options.hardDelete) {
        await deleteDoc(docRef);
      } else {
        await updateDoc(docRef, { isDeleted: true } as Record<string, unknown>);
      }
    } catch (error) {
      handleFirestoreError(
        this.collectionName,
        options.hardDelete ? 'hardDelete' : 'softDelete',
        error,
        this.logger,
        uid
      );
    }
  }
}
