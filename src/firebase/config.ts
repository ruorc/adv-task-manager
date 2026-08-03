import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

/**
 * Structural communication contract defining the parameters required to initialize
 * connection sessions with Firebase cloud services. All properties are immutable
 * to shield application environment configurations against side-channel modifications.
 */
export interface ReadonlyFirebaseConfig {
  /** The unique authorization key assigned to the application instance for cloud network verification */
  readonly apiKey: string;
  /** The target domain namespace managing authentication and single sign-on redirect handshakes */
  readonly authDomain: string;
  /** The core resource identifier hosting the cloud databases and serverless architecture */
  readonly projectId: string;
  /** The dedicated cloud storage location path for user uploads and media assets */
  readonly storageBucket: string;
  /** The identification code directing cloud messaging payloads and active device push notifications */
  readonly messagingSenderId: string;
  /** The absolute identifier bound to this specific client application deployment */
  readonly appId: string;
}

/**
 * Validates and extracts required Firebase environment variables.
 * Throws a clear structural error at initialization time if any key is missing.
 */
const parseFirebaseConfig = (): ReadonlyFirebaseConfig => {
  const requiredKeys: Record<keyof ReadonlyFirebaseConfig, string | undefined> =
    {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };

  const missingKeys = Object.entries(requiredKeys)
    .filter(([_, value]) => !value || value.trim() === '')
    .map(
      ([key]) => `VITE_FIREBASE_${key.replace(/([A-Z])/g, '_$1').toUpperCase()}`
    );

  if (missingKeys.length > 0) {
    throw new Error(
      `[Firebase Initialization Error]: Missing required environment variables:\n` +
        missingKeys.map((key) => ` - ${key}`).join('\n') +
        `\nPlease check your .env file.`
    );
  }

  return requiredKeys as ReadonlyFirebaseConfig;
};

/**
 * Isolated configuration parameters mapped from the environment layout registry.
 * This structure prevents direct unmanaged exposure of runtime configuration flags
 * across deep view layers by locking parameters inside an immutable infrastructure contract.
 */
const FIREBASE_CONFIG: ReadonlyFirebaseConfig = Object.freeze(
  parseFirebaseConfig()
);

/**
 * Global domain-agnostic initialization token for the Firebase Core Application.
 * Represents the primary container instance hosting common client configurations,
 * network sockets, and shared resource managers across the runtime lifecycle.
 */
export const app: FirebaseApp = initializeApp(FIREBASE_CONFIG);

/**
 * Centralized authorization engine instance managing user identities and token validation.
 * Utilizes the modular application context to handle session retention and secure state mutations.
 */
export const auth: Auth = getAuth(app);

/**
 * Scalable cloud database client managing document collections and transaction states.
 * Provides the core interface for real-time operations and strict type-safe data serialization.
 */
export const db: Firestore = getFirestore(app);
