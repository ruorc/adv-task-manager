import { useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useParams } from 'react-router';
import { joiResolver } from '@hookform/resolvers/joi';

import { sysLogger } from '@/utils/logger';
import { useAuth } from '@/context/Auth/hooks/useAuth';
import { EntityField, EntityName } from '../constants/constants';
import { entityValidationSchema } from '../schemas/entityValidationSchema';
import {
  resolveInitialValues,
  buildSubmissionPayload,
} from '../utils/entityFormHelpers';

import type {
  AppKanbanEntities,
  KanbanCreatePayload,
} from '@/types/appKanbanTypes';
import type {
  ReadonlyKanbanForm,
  UniversalEntityModalProps,
} from '../types/kanbanTypes';

const logger = sysLogger.forModule('useEntityModalForm');

/**
 * Properties for the UseEntityModalForm hook, derived from the universal modal props.
 */
type UseEntityModalFormProps = Omit<
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
  const { user } = useAuth();
  const currentOperatorUid = user?.uid;
  const currentOperatorName = user?.displayName;

  const { boardId, columnId } = useParams<{
    readonly boardId?: string;
    readonly columnId?: string;
  }>();

  const computedDefaultValues = useMemo<ReadonlyKanbanForm>(() => {
    return resolveInitialValues(
      mode,
      entityType,
      initialData,
      boardId,
      columnId,
      availableColumns
    );
  }, [mode, entityType, initialData, boardId, columnId, availableColumns]);

  const formMethods = useForm<ReadonlyKanbanForm>({
    resolver: joiResolver(entityValidationSchema, {
      allowUnknown: true,
      stripUnknown: true,
    }),
    context: { entityType },
    defaultValues: computedDefaultValues,
    mode: 'onChange',
  });

  const { reset, setValue, control } = formMethods;

  const watchedParent = useWatch({ control, name: EntityField.PARENT });

  useEffect(() => {
    if (isOpen) {
      reset(computedDefaultValues);
    }
  }, [isOpen, computedDefaultValues, reset]);

  useEffect(() => {
    if (entityType !== EntityName.TASK) {
      return;
    }

    // Ensure availableColumns collection is valid and watchedParent is a usable lookup key string before querying properties
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

  const handleSubmitForm = (data: ReadonlyKanbanForm) => {
    if (!currentOperatorUid || !currentOperatorName) {
      logger.error(
        'Submission blocked: Cannot resolve active user session context.'
      );

      return;
    }

    const finalPayload = buildSubmissionPayload(
      data,
      mode,
      entityType,
      currentOperatorUid,
      currentOperatorName,
      initialData
    );

    if (finalPayload === null) {
      onClose();

      return;
    }

    if ('uid' in finalPayload && finalPayload.uid) {
      onSubmit(finalPayload as AppKanbanEntities);
    } else {
      onSubmit(finalPayload as KanbanCreatePayload);
    }

    onClose();
  };

  return {
    formMethods,
    handleSubmitForm,
  };
};
