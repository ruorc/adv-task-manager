import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  getDocs,
  type FirestoreDataConverter,
} from 'firebase/firestore';

import { db } from '@/firebase/config';
import { handleFirestoreError } from '../utils/firestoreErrorHandler';
import { createFirestoreConverter } from '../utils/firestoreConverterFactory';
import { prepareFirestorePatch } from '../utils/firestorePatchUtils';
import { buildFirestoreQuery } from '../utils/firestoreQueryBuilder';

import type {
  BaseServiceLogger,
  CollectionQueryParams,
  JoiSchemaValidator,
} from '../types/firestoreTypes';

/**
 * Abstract domain controller providing standard operational blueprints for individual collections.
 * Establishes core data orchestration boundaries, handles data converters, executes basic CRUD logic,
 * and delegates business mutations down to specific entity subclasses.
 */
export abstract class BaseFirestoreService<T extends { uid: string }> {
  /** Root database path tracking coordinates. */
  protected abstract collectionName: string;

  /** Active validation parameters safeguarding runtime mutations. */
  protected abstract schema: JoiSchemaValidator<T>;

  /**
   * Checks if the incoming form payload has actual changes compared to the database snapshot.
   * Compares the persistent node snapshot against the submitted configuration block to look for adjustments.
   */
  protected abstract hasChanges(current: T, incoming: Partial<T>): boolean;

  /**
   * Enforces domain-specific default flags and layout resets upon mutations.
   * Sanitizes entity payloads during creation or structural updates, guaranteeing proper initial states.
   */
  protected abstract enforceDefaultFlags(payload: Partial<T>): Partial<T>;

  /** Active downstream telemetry targets. */
  protected logger: BaseServiceLogger;

  /**
   * Builds instances ensuring fallback log strategies handle runtime gaps safely.
   * Takes an optional telemetry destination logger object and falls back to a
   * standard console logger configuration when undefined.
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
   * Configures the shared converter blueprint bound to the active collection name,
   * validation schema, and telemetry logger instance.
   */
  protected get converter(): FirestoreDataConverter<T> {
    return createFirestoreConverter(
      this.collectionName,
      this.schema,
      this.logger
    );
  }

  /**
   * Retrieves structural instances identified by target domain credentials primary key value.
   * Requests a specific document by its unique identity string, applies the automated
   * converter layer, and returns the presentation-ready mapped model, or null if the
   * document does not exist or has been soft-deleted.
   */
  public async getById(uid: string): Promise<T | null> {
    const docRef = doc(db, this.collectionName, uid).withConverter(
      this.converter
    );

    try {
      const snapshot = await getDoc(docRef);

      if (!snapshot.exists()) return null;

      const data = snapshot.data();

      return (data as unknown as Record<string, unknown>).isDeleted === true
        ? null
        : data;
    } catch (error) {
      handleFirestoreError(
        this.collectionName,
        'getById',
        error,
        this.logger,
        uid
      );

      return null;
    }
  }

  /**
   * Collects structural domain instances conforming to runtime evaluation filters config structures.
   * Delegates the passed query parameters to the centralized builder utility to assembly database
   * constraints, returning an array of fully hydrated, active application models.
   */
  public async getMany(queryParams?: CollectionQueryParams): Promise<T[]> {
    try {
      const constraints = buildFirestoreQuery(queryParams);
      const collectionRef = collection(db, this.collectionName).withConverter(
        this.converter
      );
      const q = query(collectionRef, ...constraints);
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
    } catch (error) {
      handleFirestoreError(this.collectionName, 'getMany', error, this.logger);

      return [];
    }
  }

  /**
   * Generates a new unique identifier in Firestore, inserts it into the payload,
   * enforces standard lifecyle initialization flags, and persists it as a new document.
   * Receives a raw input data payload, binds a unique reference ID string, passes state mutations
   * to default rule builders, and returns the resulting mapped entity.
   */
  public async create(rawPayload: Partial<T>): Promise<T | undefined> {
    const newDocRef = doc(collection(db, this.collectionName)).withConverter(
      this.converter
    );
    const initialPayload = { ...rawPayload, uid: newDocRef.id };
    const payload = this.enforceDefaultFlags(initialPayload) as T;

    try {
      await setDoc(newDocRef, payload);

      return payload;
    } catch (firestoreError) {
      handleFirestoreError(
        this.collectionName,
        'create',
        firestoreError,
        this.logger,
        newDocRef.id
      );

      return undefined;
    }
  }

  /**
   * Commits structural values validating state boundaries before operational transactions execute.
   * Resolves the target key string, evaluates modifications against the current remote document
   * snapshot to skip redundant updates, resets lifecycle indicators, and updates the database node.
   */
  public async save(
    rawPayload: Partial<T>,
    customUid?: string
  ): Promise<T | undefined> {
    const targetUid = customUid || rawPayload.uid;

    if (typeof targetUid !== 'string' || !targetUid) {
      this.logger.error(
        `Operational error: UID is missing during write in [${this.collectionName}]`
      );

      throw new Error(
        'Operational failure: Entity identification UID is missing.'
      );
    }

    const docRef = doc(db, this.collectionName, targetUid).withConverter(
      this.converter
    );

    try {
      const currentDoc = await getDoc(docRef);

      if (currentDoc.exists()) {
        if (!this.hasChanges(currentDoc.data() as T, rawPayload)) {
          return currentDoc.data();
        }
      }

      const initialPayload = { ...rawPayload, uid: targetUid };
      const payload = this.enforceDefaultFlags(initialPayload) as T;

      await setDoc(docRef, payload);

      return payload;
    } catch (firestoreError) {
      handleFirestoreError(
        this.collectionName,
        'save',
        firestoreError,
        this.logger,
        targetUid
      );

      return undefined;
    }
  }

  /**
   * Performs granular mutation queries targeting explicit values using a partial subset updates map.
   * Takes a specific document identification pointer alongside partial payload updates, compares changes
   * to bypass network operations on dead payloads, and routes normalized structures into direct document mutations.
   */
  public async update(
    uid: string,
    updates: Partial<Omit<T, 'uid'>>
  ): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, uid).withConverter(
        this.converter
      );
      const currentDoc = await getDoc(docRef);

      if (!currentDoc.exists()) return;

      if (!this.hasChanges(currentDoc.data() as T, updates as Partial<T>))
        return;

      const patch = this.enforceDefaultFlags(updates as Partial<T>);
      const normalizedPatch = prepareFirestorePatch(
        patch as Record<string, unknown>
      );

      await updateDoc(doc(db, this.collectionName, uid), normalizedPatch);
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
   * Resolves the target database coordinates using an explicit identification key, switching
   * between immediate document removal or setting a passive soft archive flag based on options config.
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
