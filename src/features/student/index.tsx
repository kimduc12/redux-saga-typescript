import { useAppDispatch } from 'app/hooks';
import { cityActions } from 'features/city/citySlice';
import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import AddEditPage from './pages/AddEditPage';
import StudentListPage from './pages/StudentListPage';

export default function StudentFeature() {
    const match = useRouteMatch();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(cityActions.fetchCityList());
    }, [dispatch]);

    return (
        <Switch>
            <Route path={`${match.url}`} exact>
                <StudentListPage />
            </Route>
            <Route path={`${match.url}/add`}>
                <AddEditPage />
            </Route>
            <Route path={`${match.url}/:studentId`}>
                <AddEditPage />
            </Route>
        </Switch>
    );
}
