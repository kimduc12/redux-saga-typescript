import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';

export interface WidgetProps {
    title: string;
    children: any;
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`,
    },
}));

export default function Widget({ title, children }: WidgetProps): ReactElement {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <Typography variant="button">{title}</Typography>
            <Box mt={2}>{children}</Box>
        </Paper>
    );
}
