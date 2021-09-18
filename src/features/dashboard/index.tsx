import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { ChatBubble, ChatRounded, LinearScaleSharp, PeopleAlt } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import RankingStudentList from './components/RankingStudentList';
import StatisticItem from './components/StatisticItem';
import Widget from './components/Widget';
import {
    dashboardActions,
    selectDashboardLoading,
    selectHighestStundentList,
    selectLowestStundentList,
    selectRankingByCityList,
    selectStatistics,
} from './dashboardSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(1),
    },
    loading: {
        position: 'absolute',
        top: theme.spacing(-1),
        width: '100%',
    },
}));

export default function Dashboard() {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectDashboardLoading);
    const statistics = useAppSelector(selectStatistics);
    const highestStudentList = useAppSelector(selectHighestStundentList);
    const lowestStudentList = useAppSelector(selectLowestStundentList);
    const rankingByCityList = useAppSelector(selectRankingByCityList);

    useEffect(() => {
        dispatch(dashboardActions.fetchData());
    }, [dispatch]);
    return (
        <Box className={classes.root}>
            {/* Loadding */}
            {loading && <LinearProgress className={classes.loading} />}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<PeopleAlt fontSize="large" color="primary" />}
                        label="Male"
                        value={statistics.maleCount}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<ChatRounded fontSize="large" color="primary" />}
                        label="Female"
                        value={statistics.femaleCount}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<ChatBubble fontSize="large" color="primary" />}
                        label="Mark >= 9"
                        value={statistics.highMarkCount}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<LinearScaleSharp fontSize="large" color="primary" />}
                        label="Mark <= 5"
                        value={statistics.lowMarkCount}
                    />
                </Grid>
            </Grid>

            {/* {All student ranking} */}
            <Box mt={4}>
                <Typography variant="h4">All students</Typography>
                <Box mt={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Widget title="Student with highest mark">
                                <RankingStudentList studentList={highestStudentList} />
                            </Widget>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Widget title="Student with lowest mark">
                                <RankingStudentList studentList={lowestStudentList} />
                            </Widget>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            {/* {Ranking by city} */}
            <Box mt={4}>
                <Typography variant="h4">Rankings by city</Typography>
                <Box mt={2}>
                    <Grid container spacing={3}>
                        {rankingByCityList.map((ranking) => (
                            <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
                                <Widget title={ranking.cityName}>
                                    <RankingStudentList studentList={ranking.rankingList} />
                                </Widget>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}
