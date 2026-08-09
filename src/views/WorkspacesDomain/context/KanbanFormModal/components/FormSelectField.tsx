import React, { type JSX } from 'react';
import {
  Controller,
  get,
  type Control,
  type FieldErrors,
  type Path,
} from 'react-hook-form';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  FormHelperText,
  Box,
} from '@mui/material';
import type { ReadonlyKanbanForm } from '../types/kanbanTypes';


/**
 * Represents a key-value data structure for data rendering 
 * within selection items.
 */
interface SelectOption {
  /** Unique identifier of the option. */
  readonly uid: string;
  /** The human-readable string displayed to users. */
  readonly label: string;
}

/**
 * Properties for the FormSelectField component configuration.
 */
interface FormSelectFieldProps {
  /** The specific entity field identifier managed by this input. */
  readonly name: Path<ReadonlyKanbanForm>;
  /** The react-hook-form control object used to register and track the input state. */
  readonly control: Control<ReadonlyKanbanForm>;
  /** Object containing active form validation errors to display error messages. */
  readonly errors: FieldErrors<ReadonlyKanbanForm>;
  /** The human-readable text label displayed over the input field. */
  readonly label: string;
  /** Array of formatted options available for selection. */
  readonly options: SelectOption[];
  /** Optional flag to mark the field as required both visually and for validation constraints. */
  readonly required?: boolean;
  /** Optional flag to enable multiple element selection. */
  readonly multiple?: boolean;
  /** Context identifier specifying which entity form is being rendered to construct unique accessibility IDs. */
  readonly entityTypeContext: string;
  /** Optional Material UI icon component to display next to the values. */
  readonly icon?: React.ComponentType<{
    /** Specific sizing scale override allocated to the icon element. */
    readonly fontSize?: 'small';
    /** UI action palette state applied to the icon element. */
    readonly color?: 'action' | 'disabled';
  }>;
}

/** Standardized dropdown selection component integrated with react-hook-form. */
export const FormSelectField = ({
  name,
  control,
  errors,
  label,
  options,
  required = false,
  multiple = false,
  entityTypeContext,
  icon: Icon,
}: FormSelectFieldProps): JSX.Element => {
  const labelId = `${entityTypeContext}-${name}-label`;

  const fieldError = get(errors, name);

  const renderSelectedValue = (
    selected: string | string[] | undefined
  ): React.ReactNode => {
    if (!selected || (Array.isArray(selected) && selected.length === 0)) {
      return null;
    }

    const renderText = (): string => {
      if (Array.isArray(selected)) {
        return options
          .filter((opt) => selected.includes(opt.uid))
          .map((opt) => opt.label)
          .join(', ');
      }

      const matched = options.find((opt) => opt.uid === selected);

      return matched ? matched.label : selected;
    };

    if (!Icon) {
      return <span>{renderText()}</span>;
    }

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Icon fontSize="small" color="action" />
        <span>{renderText()}</span>
      </Box>
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const isAssigneesField = name === 'assignees';
        
        const selectValue: string | string[] = multiple
          ? (Array.isArray(field.value) ? field.value : [])
          : ((field.value as string) ?? '');

        const isMultipleArray = multiple && Array.isArray(selectValue);
        const isOptionsRegistryEmpty = options.length === 0;

        return (
          <FormControl fullWidth error={!!fieldError} required={required}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
              {...field}
              value={selectValue}
              labelId={labelId}
              multiple={multiple}
              input={multiple ? <OutlinedInput label={label} /> : undefined}
              label={multiple ? undefined : label}
              renderValue={(selected) =>
                renderSelectedValue(selected as string | string[])
              }
              onChange={(e) => {
                const newValue = e.target.value;

                field.onChange(
                  multiple && Array.isArray(newValue) 
                    ? newValue 
                    : (newValue === '' ? null : newValue)
                );
              }}
            >
              {isOptionsRegistryEmpty ? (
                <MenuItem disabled value="">
                  <ListItemText
                    primary={`No available ${isAssigneesField ? 'users' : 'items'} found`}
                    slotProps={{
                      primary: { color: 'text.disabled', variant: 'body2' },
                    }}
                  />
                </MenuItem>
              ) : (
                options.map((opt) => {
                  const menuItemValue = opt.uid === null ? '' : opt.uid;

                  const isChecked =
                    multiple && isMultipleArray
                      ? (selectValue as string[]).indexOf(opt.uid) > -1
                      : false;

                  return (
                    <MenuItem
                      key={opt.uid ?? 'unassigned'}
                      value={menuItemValue}
                    >
                      {multiple && <Checkbox checked={isChecked} />}
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
                      >
                        {!multiple && Icon && (
                          <Icon fontSize="small" color="disabled" />
                        )}
                        <ListItemText
                          primary={opt.label}
                          style={{ margin: 0 }}
                        />
                      </Box>
                    </MenuItem>
                  );
                })
              )}
            </Select>
            <FormHelperText>
              {fieldError?.message ? String(fieldError.message) : undefined}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};
