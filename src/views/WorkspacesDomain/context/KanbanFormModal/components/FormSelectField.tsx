import React, { type JSX } from 'react';
import {
  Controller,
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

import type { EntityField } from '../constants/constants';
import type { KanbanEntities } from '../types/types';

/**
 * Represents a key-value data structure for data rendering within selection items.
 */
export interface SelectOption {
  /** Unique identifier of the option. */
  uid: string;
  /** The human-readable string displayed to users. */
  label: string;
}

/**
 * Properties for the FormSelectField component.
 */
export interface FormSelectFieldProps {
  /** The specific entity field identifier managed by this input. */
  name: EntityField & Path<KanbanEntities>;
  /** The react-hook-form control object used to register and track the input state. */
  control: Control<KanbanEntities>;
  /** Object containing active form validation errors to display error messages. */
  errors: FieldErrors<KanbanEntities>;
  /** The human-readable text label displayed over the input field. */
  label: string;
  /** Array of formatted options available for selection. */
  options: SelectOption[];
  /** Optional flag to mark the field as required both visually and for validation constraints. */
  required?: boolean;
  /** Optional flag to enable multiple element selection. */
  multiple?: boolean;
  /** Context identifier specifying which entity form is being rendered to construct unique accessibility IDs. */
  entityTypeContext: string;
  /** Optional Material UI icon component to display next to the values. */
  icon?: React.ComponentType<{
    /** Optional size constraint for the rendered icon. */
    fontSize?: 'small';
    /** Optional color theme intent variant for the icon state styling. */
    color?: 'action' | 'disabled';
  }>;
}

/**
 * A standardized dropdown selection field component integrated with react-hook-form and Material UI styling.
 */
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
        const selectValue = multiple
          ? Array.isArray(field.value)
            ? field.value
            : []
          : (field.value ?? '');

        const isMultipleArray = multiple && Array.isArray(selectValue);
        const isOptionsRegistryEmpty = options.length === 0;

        return (
          <FormControl fullWidth error={!!errors[name]} required={required}>
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

                if (multiple && Array.isArray(newValue)) {
                  field.onChange(newValue);
                } else {
                  field.onChange(newValue === '' ? null : newValue);
                }
              }}
            >
              {isOptionsRegistryEmpty ? (
                <MenuItem disabled value="">
                  <ListItemText
                    primary={`No available ${name === 'assignees' ? 'users' : 'items'} found`}
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
              {errors[name]?.message
                ? String(errors[name]?.message)
                : undefined}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};
