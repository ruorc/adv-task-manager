import { type JSX } from 'react';
import {
  Controller,
  type Control,
  type FieldErrors,
  type Path,
} from 'react-hook-form';
import { TextField } from '@mui/material';

import type { EntityField } from '../constants/constants';
import type { KanbanEntities } from '../types/types';

/**
 * Properties for the FormTextField component.
 */
interface FormTextFieldProps {
  /** The specific entity field identifier managed by this input. */
  name: EntityField & Path<KanbanEntities>;
  /** The react-hook-form control object used to register and track the input state. */
  control: Control<KanbanEntities>;
  /** Object containing active form validation errors to display error messages. */
  errors: FieldErrors<KanbanEntities>;
  /** The human-readable text label displayed over the input field. */
  label: string;
  /** Optional flag to mark the field as required both visually and for native constraints. */
  required?: boolean;
  /** Optional flag to transform the input into a multi-line text area. */
  multiline?: boolean;
  /** Optional configuration setting the number of visible rows when multiline is active. */
  rows?: number;
}

/**
 * A standardized input text field component integrated with react-hook-form and Material UI styling.
 */
export const FormTextField = ({
  name,
  control,
  errors,
  label,
  required = false,
  multiline = false,
  rows,
}: FormTextFieldProps): JSX.Element => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const errorEntry = errors[name];
        const errorMessage =
          errorEntry &&
          'message' in errorEntry &&
          typeof errorEntry.message === 'string'
            ? errorEntry.message
            : undefined;

        return (
          <TextField
            {...field}
            label={label}
            fullWidth
            required={required}
            multiline={multiline}
            rows={rows}
            error={!!errorEntry}
            helperText={errorMessage}
          />
        );
      }}
    />
  );
};
