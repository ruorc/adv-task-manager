import { type JSX } from 'react';
import {
  Controller,
  get,
  type Control,
  type FieldErrors,
  type Path,
} from 'react-hook-form';
import { TextField } from '@mui/material';

import type { KanbanFormState } from '../types/kanbanTypes';

/**
 * Configuration properties required to initialize and render
 * a standardized text input form field.
 */
interface FormTextFieldProps {
  /** The specific entity field identifier managed by this input. */
  readonly name: Path<KanbanFormState>;
  /** The react-hook-form control object used to register and track the input state. */
  readonly control: Control<KanbanFormState>;
  /** Object containing active form validation errors to display error messages. */
  readonly errors: FieldErrors<KanbanFormState>;
  /** The human-readable text label displayed over the input field. */
  readonly label: string;
  /** Optional flag to mark the field as required both visually and for native constraints. */
  readonly required?: boolean;
  /** Optional flag to transform the input into a multi-line text area. */
  readonly multiline?: boolean;
  /** Optional configuration setting the number of visible rows when multiline is active. */
  readonly rows?: number;
}

/** Standardized text input field component integrated with react-hook-form. */
export const FormTextField = ({
  name,
  control,
  errors,
  label,
  required = false,
  multiline = false,
  rows,
}: FormTextFieldProps): JSX.Element => {
  const fieldError = get(errors, name);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const errorMessage = fieldError?.message
          ? String(fieldError.message)
          : undefined;

        return (
          <TextField
            {...field}
            label={label}
            fullWidth
            required={required}
            multiline={multiline}
            rows={rows}
            error={!!fieldError}
            helperText={errorMessage}
          />
        );
      }}
    />
  );
};
