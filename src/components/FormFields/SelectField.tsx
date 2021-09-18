import { FormHelperText, InputLabel } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Control, useController } from 'react-hook-form';

export interface SelectOption {
    label?: string;
    value: number | string;
}

interface SelectFieldProps {
    name: string;
    control: Control<any>;
    label: string;
    disabled?: boolean;
    options: SelectOption[];
}

export function SelectField({ name, control, label, disabled, options }: SelectFieldProps) {
    const {
        field: { value, onChange, onBlur },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    });

    return (
        <FormControl
            fullWidth
            disabled={disabled}
            variant="outlined"
            size="small"
            margin="normal"
            component="fieldset"
            error={invalid}
        >
            <InputLabel id={`${name}_label`}>{label}</InputLabel>
            <Select labelId={`${name}_label`} label={label} value={value} onChange={onChange} onBlur={onBlur}>
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>

            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
}
