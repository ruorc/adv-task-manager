/**
 * Configuration payload options specifying content and styling
 * parameters for a dynamic confirmation prompt session.
 */
export interface ConfirmOptions {
  /** The primary header text displayed at the top of the confirmation dialog. */
  readonly title: string;
  /** Detailed explanatory body text describing the consequences of the action. */
  readonly description: string;
  /** Optional customized text for the affirmative action button. */
  readonly confirmLabel?: string;
  /** Optional customized text for the dismissive action button. */
  readonly cancelLabel?: string;
  /** High-severity modifier styling the confirmation layout to emphasize hazardous operations. */
  readonly isDanger?: boolean;
}

/**
 * Functional API contract exposed by the confirmation context stream
 * to trigger imperative dialog flows.
 */
export interface ConfirmContextType {
  /** Triggers the global confirmation flow and returns a Promise waiting for explicit user interaction. */
  readonly showConfirm: (
    /** The dynamic text content and styling options for the dialog presentation. */
    options: ConfirmOptions
  ) => Promise<boolean>;
}
