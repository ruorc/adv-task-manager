/**
 * Utility function to normalize partial updates before sending to updateDoc.
 * Transforms recognized layout arrays into Firestore dictionary records.
 */
export function prepareFirestorePatch(
  updates: Record<string, unknown>
): Record<string, unknown> {
  const patch = { ...updates };

  if ('assignees' in patch && Array.isArray(patch.assignees)) {
    patch.assignees = Object.fromEntries(patch.assignees);
  }

  return patch;
}
