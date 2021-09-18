import { Box, Button, makeStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { City, Student } from 'models';
import React, { useState } from 'react';
import { capitalizeString, getMarkColor } from 'utils';

export interface StudentTableProps {
    cityMap: {
        [key: string]: City;
    };
    studentList: Student[];
    onEdit?: (student: Student) => void;
    onRemove?: (student: Student) => void;
}

const useStyles = makeStyles((theme) => ({
    table: {},
    actions: {
        '& > button': {
            marginRight: theme.spacing(1),
        },
    },
}));

export default function StudentTable({ studentList, cityMap, onEdit, onRemove }: StudentTableProps) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student>();

    const handleClose = () => {
        setOpen(false);
    };

    const handleRemoveConfirm = () => {
        if (!onRemove || !selectedStudent) return;
        onRemove(selectedStudent);
        setOpen(false);
    };

    const handleRemoveClick = (student: Student) => {
        setSelectedStudent(student);
        setOpen(true);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Mark</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentList.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell width={310}>{student.id}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{capitalizeString(student.gender)}</TableCell>
                                <TableCell>
                                    <Box color={getMarkColor(student.mark)} fontWeight="bold">
                                        {student.mark}
                                    </Box>
                                </TableCell>
                                <TableCell>{cityMap[student.city]?.name}</TableCell>
                                <TableCell align="right" className={classes.actions}>
                                    <Button variant="contained" color="primary" onClick={() => onEdit?.(student)}>
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleRemoveClick(student)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog confirm delete student */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Remove student</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to remove student named {selectedStudent?.name}. This action can not be undo.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleRemoveConfirm} variant="contained" color="secondary" autoFocus>
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
