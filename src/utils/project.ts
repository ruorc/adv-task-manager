/**
 * Transforms an arbitrary string sequence into a normalized, URL-safe slug format.
 * Strips special characters, removes emojis, and replaces contiguous whitespace vectors with single dashes.
 */
export const toSlug = (value: string): string => {
  // Example: "Vite + React + TS" -> "vite-react-ts"
  // Example: "Example Project 👍" -> "example-project"
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // remove emojis/special chars
    .trim()
    .replace(/\s+/g, '-'); // replace spaces with dashes
};
