/**
 * Safely extracts detailed diagnostic messaging or structural validation logs from non-ok server responses.
 */
export async function formatServerError(response: Response): Promise<string> {
  const defaultMessage = `HTTP error. Status: ${response.status}`;

  try {
    const rawText = await response.text();

    if (!rawText.trim()) {
      return defaultMessage;
    }

    try {
      const errorJson = JSON.parse(rawText);

      if (typeof errorJson === 'string') {
        return `HTTP ${response.status}: ${errorJson}`;
      }

      let serverMessage = errorJson?.message || errorJson?.error;

      if (!serverMessage && Array.isArray(errorJson?.errors)) {
        serverMessage = errorJson.errors
          .map((err: unknown) =>
            typeof err === 'object' && err !== null
              ? (err as Record<string, unknown>).message || JSON.stringify(err)
              : String(err)
          )
          .join(', ');
      }

      if (
        !serverMessage &&
        typeof errorJson === 'object' &&
        errorJson !== null
      ) {
        const stringified = JSON.stringify(errorJson);

        if (stringified !== '{}') {
          serverMessage = stringified;
        }
      }

      return serverMessage
        ? `HTTP ${response.status}: ${serverMessage}`
        : defaultMessage;
    } catch {
      return `HTTP ${response.status}: ${rawText}`;
    }
  } catch {
    return defaultMessage;
  }
}
