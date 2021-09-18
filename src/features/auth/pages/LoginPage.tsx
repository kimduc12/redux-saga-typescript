import { Box, Button, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React from 'react';
import { login } from '../authSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },
    paper: {
        padding: theme.spacing(2),
    },
    box: {
        marginTop: theme.spacing(4),
    },
}));

function LoginPage() {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const isLogging = useAppSelector((state) => state.auth.logging);
    const handleLogin = () => {
        dispatch(
            login({
                username: 'abc',
                password: 'abc',
            })
        );
    };
    return (
        <div className={classes.root}>
            <Paper elevation={1} className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Student Management
                </Typography>
                <Box className={classes.box}>
                    <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
                        {isLogging && <CircularProgress size={20} color="secondary" />} &nbsp; Fake login
                    </Button>
                </Box>
            </Paper>
        </div>
    );
}

export default LoginPage;
