import { Box, makeStyles, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentForm from '../components/StudentForm';

const useStyles = makeStyles((theme) => ({
    root: {},
    back: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
        '& > span': {
            display: 'flex',
            alignItems: 'center',
        },
    },
}));

export default function AddEditPage() {
    const classes = useStyles();
    const history = useHistory();
    const { studentId } = useParams<{ studentId: string }>();
    const isEdit = Boolean(studentId);
    const [student, setStudent] = useState<Student>();

    useEffect(() => {
        if (!studentId) return;
        (async () => {
            try {
                const response: Student = await studentApi.get(studentId);
                setStudent(response);
            } catch (error) {
                console.log('get student by id error', error.message);
            }
        })();
    }, [studentId]);

    const initialValue: Student = {
        name: '',
        age: 0,
        mark: 0,
        gender: 'male',
        city: '',
        ...student,
    };

    const handleFormSubmit = async (formValues: Student) => {
        console.log('handleFormSubmit', formValues);
        if (isEdit) {
            await studentApi.update(studentId, formValues);
        } else {
            await studentApi.add(formValues);
        }
        toast.success('Save student successfully!');
        history.push('/admin/students');
        // throw new Error('Something wrong');
    };

    return (
        <Box>
            <Link to="/admin/students" className={classes.back}>
                <Typography variant="caption">
                    <ChevronLeft /> Back to student list
                </Typography>
            </Link>

            <Typography variant="h4">{isEdit ? `Edit student` : `Add new student`}</Typography>
            {(!isEdit || Boolean(student)) && (
                <Box mt={3}>
                    <StudentForm initialValue={initialValue} onSubmit={handleFormSubmit} />
                </Box>
            )}
        </Box>
    );
}
