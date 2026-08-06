import { type JSX } from 'react';
import { useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';

import type { ReadonlyAuthForm } from '../types/authFormTypes';

/**
 * Structural contract defining properties for the reusable authentication text field.
 */
interface AuthTextFieldProps {
  /** The name of the field, corresponding to the form's data structure. */
  readonly name: keyof ReadonlyAuthForm;
  /** The label text displayed above the input field. */
  readonly label: string;
  /** The type of input expected (e.g., text, email, password). Defaults to 'text'. */
  readonly type?: 'text' | 'email' | 'password';
  /** Indicates whether the field is mandatory for form submission. Defaults to false. */
  readonly required?: boolean;
}

/**
 * Centralized Form Input Wrapper Component. Eliminates Material UI TextField duplication
 * by subscribing internally to the form execution context.
 */
export const AuthTextField = ({
  name,
  label,
  type = 'text',
  required = false,
}: AuthTextFieldProps): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ReadonlyAuthForm>();

  const fieldId = `auth-${name}-input`;

  return (
    <TextField
      id={fieldId}
      label={label}
      type={type}
      required={required}
      fullWidth
      variant="outlined"
      error={Boolean(errors[name])}
      helperText={errors[name]?.message}
      {...register(name)}
      slotProps={{
        inputLabel: { htmlFor: fieldId },
      }}
    />
  );
};
