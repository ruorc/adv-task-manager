import React, { type JSX, createElement } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Box,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';

import {
  EntityField,
  EntityType,
  FormMode,
  UI_TEXT,
} from '../constants/constants';
import { useEntityModalContext } from '../hooks/useEntityModalContext';
import { FormTextField } from '../components/FormTextField';
import { FormSelectField } from '../components/FormSelectField';

/**
 * Structural layout parameter schema defined for the inner container layout boundaries.
 */
interface ModalFormContentProps {
  /** Dictionary mapping user identifiers to their respective human-readable names for assignment roles. */
  readonly availableUsers: Record<string, string>;
  /** Dictionary mapping board identifiers to their display titles for selection or relational binding. */
  readonly availableBoards: Record<string, string>;
  /** Dictionary mapping column identifiers to their display titles for selection or relational binding. */
  readonly availableColumns: Record<string, string>;
}

/**
 * Structural layout sub-component that consumes form states and renders inner controls.
 */
export const ModalFormContent = ({
  availableUsers,
  availableBoards,
  availableColumns,
}: ModalFormContentProps): JSX.Element => {
  const {
    formMethods: {
      control,
      formState: { errors },
    },
    entityType,
    mode,
    onClose,
    handleSubmitForm,
    formMethods,
  } = useEntityModalContext();

  const userOptions = Object.entries(availableUsers).map(([uid, name]) => ({
    uid,
    label: name,
  }));

  const boardOptions = Object.entries(availableBoards).map(([uid, title]) => ({
    uid,
    label: title,
  }));

  const columnOptions = Object.entries(availableColumns).map(
    ([uid, title]) => ({
      uid,
      label: title,
    })
  );

  const getModalHeader = (): React.ReactNode => {
    const prefix =
      mode === FormMode.CREATE
        ? UI_TEXT.TITLE_PREFIX_CREATE
        : UI_TEXT.TITLE_PREFIX_EDIT;
    const entityName = entityType.charAt(0).toUpperCase() + entityType.slice(1);

    let HeaderIcon = AssignmentIcon;

    if (entityType === EntityType.BOARD) {
      HeaderIcon = DashboardIcon;
    }

    if (entityType === EntityType.COLUMN) {
      HeaderIcon = ViewColumnIcon;
    }

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <HeaderIcon color="primary" />
        <span>{`${prefix} ${entityName}`}</span>
      </Box>
    );
  };

  return (
    <form onSubmit={formMethods.handleSubmit(handleSubmitForm)} noValidate>
      <DialogTitle>{getModalHeader()}</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          <FormTextField
            name={EntityField.TITLE}
            control={control}
            errors={errors}
            label={UI_TEXT.LABEL_TITLE}
            required
          />

          <FormTextField
            name={EntityField.DESCRIPTION}
            control={control}
            errors={errors}
            label={UI_TEXT.LABEL_DESCRIPTION}
            multiline
            rows={3}
          />

          {createElement(FormSelectField, {
            name: EntityField.ASSIGNEES,
            control: control,
            errors: errors,
            label: UI_TEXT.LABEL_ASSIGNEES,
            options: userOptions,
            multiple: true,
            entityTypeContext: entityType,
            icon: PersonIcon,
          })}

          {entityType === EntityType.COLUMN &&
            createElement(FormSelectField, {
              name: EntityField.PARENT,
              control: control,
              errors: errors,
              label: UI_TEXT.LABEL_TARGET_BOARD,
              options: boardOptions,
              entityTypeContext: entityType,
            })}

          {entityType === EntityType.TASK &&
            createElement(FormSelectField, {
              name: EntityField.PARENT,
              control: control,
              errors: errors,
              label: UI_TEXT.LABEL_TARGET_COLUMN,
              options: columnOptions,
              entityTypeContext: entityType,
            })}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          {UI_TEXT.BUTTON_CANCEL}
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {mode === FormMode.CREATE
            ? UI_TEXT.BUTTON_CREATE
            : UI_TEXT.BUTTON_SAVE}
        </Button>
      </DialogActions>
    </form>
  );
};
