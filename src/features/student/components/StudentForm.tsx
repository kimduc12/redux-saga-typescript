import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useAppSelector } from 'app/hooks';
import { InputField, RadioGroupField } from 'components/FormFields';
import { SelectField } from 'components/FormFields/SelectField';
import { selectCityOptions } from 'features/city/citySlice';
import { Student } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface StudentFormProps {
    initialValue?: Student;
    onSubmit?: (formValues: Student) => void;
}

export default function StudentForm({ initialValue, onSubmit }: StudentFormProps) {
    const cityOptions = useAppSelector(selectCityOptions);
    const [error, setError] = useState('');

    const schema = yup.object().shape({
        name: yup
            .string()
            .required('Please enter name')
            .test('two-word', 'Please enter at least 2 words', (value) => {
                if (!value) return true;
                const parts = value?.split(' ') || [];
                return parts.filter((x) => !!x).length >= 2;
            }),
        age: yup
            .number()
            .positive('Please enter positive number')
            .integer('Please enter an integer')
            .min(18, 'Min is 18')
            .max(100, 'Max is 100')
            .required('Please enter age')
            .typeError('Please enter number'),
        mark: yup
            .number()
            .min(0, 'Min is 0')
            .max(10, 'Max is 10')
            .required('Please enter mark')
            .typeError('Please enter number'),
        gender: yup
            .string()
            .oneOf(['male', 'female'], 'Please select etheir male or female')
            .required('Please choose gender'),
        city: yup.string().required('Please select city'),
    });

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<Student>({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });

    const handleSubmitForm = async (formValues: Student) => {
        if (!onSubmit) return;
        try {
            setError('');
            await onSubmit(formValues);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Box>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <InputField name="name" label="Full name" control={control} />

                <RadioGroupField
                    name="gender"
                    label="Gender"
                    control={control}
                    options={[
                        {
                            label: 'Male',
                            value: 'male',
                        },
                        {
                            label: 'Female',
                            value: 'female',
                        },
                    ]}
                />

                <InputField name="age" label="Age" control={control} type="number" />
                <InputField name="mark" label="Mark" control={control} type="number" />

                {Array.isArray(cityOptions) && cityOptions.length > 0 && (
                    <SelectField name="city" label="City" control={control} options={cityOptions} />
                )}

                {error && <Alert severity="error">{error}</Alert>}
                <Box mt={2}>
                    <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                        {isSubmitting && <CircularProgress size={16} />} Save
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
