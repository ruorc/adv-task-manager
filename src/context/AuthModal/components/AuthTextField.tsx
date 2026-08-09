import { type JSX } from 'react';
import { useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';

import type { ReadonlyAuthForm } from '../types/authFormTypes';

/**
 * Structural configuration properties for initializing and rendering 
 * a reusable authentication input text field component.
 */
interface AuthTextFieldProps {
  /** The unique registration name key matching the form data schema. */
  readonly name: keyof ReadonlyAuthForm;
  /** The descriptive text displayed above or inside the input container. */
  readonly label: string;
  /** The semantic behavior profile determining visual masking of input data. */
  readonly type?: 'text' | 'email' | 'password';
  /** Dictates whether empty field values trigger constraint validation errors. */
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
