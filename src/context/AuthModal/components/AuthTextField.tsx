import { type JSX } from 'react';
import { useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';

import type { ReadonlyAuthForm } from '../types/authFormTypes';

/**
 * Structural contract defining properties for the reusable authentication text field.
 */
interface AuthTextFieldProps {
  /** The unique field identifier and form registration key */
  readonly name: keyof ReadonlyAuthForm;
  /** The visual text descriptor rendered as the input decoration label */
  readonly label: string;
  /** Input mechanism variation protocol determining symbol masking (e.g., text, email, password) */
  readonly type?: 'text' | 'email' | 'password';
  /** Explicit verification operator marking field compliance as mandatory */
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
