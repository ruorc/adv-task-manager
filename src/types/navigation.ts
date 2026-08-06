import type { ComponentType, ReactNode } from 'react';

/**
 * Common layout parameter state schema passed into active navigation elements.
 */
interface LinkStateProps {
  /** Reactive status flag confirming if the active URL path exactly matches this endpoint */
  readonly isActive: boolean;
}

/**
 * Structural communication contract specifying expected parameters for link presentation wrappers.
 */
export interface LinkComponentProps {
  /** Explicit render prop function transferring internal routing conditions down to presenters */
  readonly children: (props: LinkStateProps) => ReactNode;
}

/**
 * Public structural item contract for building presentation-only navigation elements.
 */
export interface NavigationItem {
  /** Cryptographically stable or scalar unique identity key */
  readonly id: string;
  /** Human-readable navigation title label rendered inside the interactive control */
  readonly label: string;
  /** Router-managed abstraction component wrapping the operational navigation target anchor link */
  readonly LinkComponent: ComponentType<LinkComponentProps>;
}

/**
 * Global application navigation registry coordinating dedicated macro links and menu collections.
 */
export interface NavigationRegistry {
  /** Injected route factory link bound strictly to the application root pathway for logo controls */
  readonly rootLink: ComponentType<LinkComponentProps>;
  /** Complete immutable collection containing abstract navigation configurations for the main menu */
  readonly links: readonly NavigationItem[];
  /** Optional reactive action node injected dynamically into the sticky infrastructure toolbar */
  readonly actionBarSlot?: ReactNode;
}
