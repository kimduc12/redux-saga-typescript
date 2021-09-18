import { TextField } from '@material-ui/core';
import React, { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    control: Control<any>;
    label: string;
}

export function InputField({ name, control, label, ...inputProps }: InputFieldProps) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    });

    return (
        <TextField
            size="small"
            fullWidth
            margin="normal"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            label={label}
            variant="outlined"
            error={invalid}
            helperText={error?.message}
            inputProps={inputProps}
        />
    );
}
