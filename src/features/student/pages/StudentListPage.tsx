import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import studentApi from 'api/studentApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import React, { useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import StudentFilters from '../components/StudentFilters';
import StudentTable from '../components/StudentTable';
import {
    selectStudentFilter,
    selectStudentList,
    selectStudentLoading,
    selectStudentPagination,
    studentActions,
} from '../studentSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
    titleContainer: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
    },
    loading: {
        position: 'absolute',
        top: theme.spacing(-1),
        width: '100%',
    },
    pagination: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

export default function StudentListPage() {
    const classes = useStyles();
    const match = useRouteMatch();
    const history = useHistory();
    const dispatch = useAppDispatch();
    const pagination = useAppSelector(selectStudentPagination);
    const loading = useAppSelector(selectStudentLoading);
    const studentList = useAppSelector(selectStudentList);
    const studentFilter = useAppSelector(selectStudentFilter);
    const cityMap = useAppSelector(selectCityMap);
    const cityList = useAppSelector(selectCityList);

    useEffect(() => {
        dispatch(studentActions.fetchStudentList(studentFilter));
    }, [dispatch, studentFilter]);

    const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
        dispatch(
            studentActions.setFilter({
                ...studentFilter,
                _page: page,
            })
        );
    };

    const handleSearchChange = (newFilter: ListParams) => {
        dispatch(studentActions.setFilterWithDebounce(newFilter));
    };

    const handlefilterChange = (newFilter: ListParams) => {
        dispatch(studentActions.setFilter(newFilter));
    };

    const handleEditStudent = (student: Student) => {
        history.push(`${match.url}/${student.id}`);
    };

    const handleRemoveStudent = async (student: Student) => {
        try {
            await studentApi.remove(student.id || '');
            dispatch(studentActions.setFilter({ ...studentFilter }));
        } catch (error) {
            console.log('handleRemoveStudent error', error.message);
        }
    };

    return (
        <Box className={classes.root}>
            <Box className={classes.titleContainer}>
                <Typography variant="h4">Students</Typography>
                <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary">
                        Add new student
                    </Button>
                </Link>
            </Box>

            {/* Filters */}
            <Box mt={3}>
                <StudentFilters
                    filter={studentFilter}
                    cityList={cityList}
                    onSearchChange={handleSearchChange}
                    onChange={handlefilterChange}
                />
            </Box>

            {/* Loading */}
            {loading && <LinearProgress className={classes.loading} />}

            {/* Student Table */}
            <StudentTable
                studentList={studentList}
                cityMap={cityMap}
                onEdit={handleEditStudent}
                onRemove={handleRemoveStudent}
            />

            {/* Pagination */}
            <Box className={classes.pagination} mt={2}>
                <Pagination
                    count={Math.ceil(pagination._totalRows / pagination._limit)}
                    page={pagination?._page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Box>
    );
}
