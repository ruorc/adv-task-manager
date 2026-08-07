import { useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useParams } from 'react-router';
import { joiResolver } from '@hookform/resolvers/joi';

import { sysLogger } from '@/utils/logger';
import { useAuth } from '@/context/Auth/hooks/useAuth';
import { EntityField, EntityType } from '../constants/constants';
import { entityValidationSchema } from '../schemas/validationSchema';
import {
  resolveInitialValues,
  buildSubmissionPayload,
} from '../utils/entityFormHelpers';

import type { KanbanEntities, UniversalEntityModalProps } from '../types/types';

const logger = sysLogger.forModule('FirebaseAuthService');

/**
 * Properties for the UseEntityModalForm hook, derived from the universal modal props.
 */
export type UseEntityModalFormProps = Omit<
  UniversalEntityModalProps,
  'availableUsers' | 'availableBoards'
>;

/**
 * Custom React hook that coordinates form initialization, real-time relational state updates, and submission pipeline workflows for the entity modal window.
 */
export const useEntityModalForm = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  entityType,
  initialData,
  availableColumns = {},
}: UseEntityModalFormProps) => {
  const { uid, operatorName } = useAuth();
  const { boardId, columnId } = useParams<{
    boardId?: string;
    columnId?: string;
  }>();

  /**
   * Pre-calculate initial form values synchronously to guarantee state stability during the first rendering pass.
   * This completely prevents hooks from initializing field elements with undefined states.
   */
  const computedDefaultValues = useMemo(() => {
    return resolveInitialValues(
      mode,
      entityType,
      initialData,
      boardId,
      columnId,
      availableColumns
    );
  }, [mode, entityType, initialData, boardId, columnId, availableColumns]);

  const formMethods = useForm<KanbanEntities>({
    resolver: joiResolver(entityValidationSchema, {
      allowUnknown: true,
      stripUnknown: true,
    }),
    context: { entityType },
    defaultValues: computedDefaultValues as KanbanEntities,
    mode: 'onChange',
  });

  const { reset, setValue, control } = formMethods;

  const watchedParent = useWatch({ control, name: EntityField.PARENT });

  /** Synchronize external dynamic modifications or initial data payload update cycles correctly */
  useEffect(() => {
    if (isOpen) {
      reset(computedDefaultValues as KanbanEntities);
    }
  }, [isOpen, computedDefaultValues, reset]);

  /** Coordinate target task hierarchy structures when form elements undergo active parent alterations */
  useEffect(() => {
    if (entityType !== EntityType.TASK) {
      return;
    }

    /** Ensure availableColumns collection is valid and watchedParent is a usable lookup key string before querying properties */
    const isColumnLookupValid =
      typeof watchedParent === 'string' &&
      availableColumns !== null &&
      availableColumns !== undefined;

    const hasSelectedColumn =
      isColumnLookupValid && watchedParent in availableColumns;

    if (hasSelectedColumn) {
      setValue(EntityField.GRAND, boardId || null);
    } else {
      setValue(EntityField.GRAND, null);
    }
  }, [watchedParent, entityType, availableColumns, boardId, setValue]);

  const handleSubmitForm = (data: KanbanEntities) => {
    if (!uid || !operatorName) {
      logger.error(
        'Submission blocked: Cannot resolve active user session context.'
      );

      return;
    }

    const finalPayload = buildSubmissionPayload(
      data,
      mode,
      entityType,
      uid,
      operatorName,
      initialData
    );

    onSubmit(finalPayload);
    onClose();
  };

  return {
    formMethods,
    handleSubmitForm,
  };
};
