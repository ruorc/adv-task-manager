import type { AppKanbanEntities } from '@/types/appKanbanTypes';

/**
 * Pure utility checking for mutations across standard Kanban workspace entity configurations.
 * Compares current immutable database node properties against newly submitted form layouts.
 */
export function hasKanbanFormChanges<T extends AppKanbanEntities>(
  current: T,
  incoming: Partial<Omit<T, 'assignees'>> & { assignees?: [string, string][] }
): boolean {
  if (incoming.title !== undefined && current.title !== incoming.title)
    return true;

  if (
    incoming.description !== undefined &&
    current.description !== incoming.description
  )
    return true;

  if (incoming.parent !== undefined && current.parent !== incoming.parent)
    return true;

  if (incoming.grand !== undefined && current.grand !== incoming.grand)
    return true;

  if (incoming.assignees !== undefined) {
    const curEntries = current.assignees
      ? Object.entries(current.assignees).sort((a, b) =>
          a[0].localeCompare(b[0])
        )
      : [];

    const incRaw = incoming.assignees;
    const incEntries = Array.isArray(incRaw)
      ? [...incRaw].sort((a, b) => a[0].localeCompare(b[0]))
      : Object.entries(incRaw as Record<string, string>).sort((a, b) =>
          a[0].localeCompare(b[0])
        );

    if (JSON.stringify(curEntries) !== JSON.stringify(incEntries)) return true;
  }

  return false;
}
