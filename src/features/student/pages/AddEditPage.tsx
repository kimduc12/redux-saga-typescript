import { Box, makeStyles, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

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
    const { studentId } = useParams<{ studentId: string }>();
    const idEdit = Boolean(studentId);
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
    return (
        <Box>
            <Link to="/admin/students" className={classes.back}>
                <Typography variant="caption">
                    <ChevronLeft /> Back to student list
                </Typography>
            </Link>

            <Typography variant="h4">{idEdit ? `Edit student` : `Add new student`}</Typography>
        </Box>
    );
}
