import { call, fork, put, take } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';

import { login, LoginPayload, loginSuccess, logout } from './authSlice';

function* handleLogin(payload: LoginPayload) {
    try {
        console.log('handleLogin', payload);
        localStorage.setItem('access_token', 'abc');
        yield put(
            loginSuccess({
                id: 1,
                name: 'admin',
            })
        );

        // redirect to admin page
        yield put(push('/admin/dashboard'));
    } catch (err) {
        // yield put(loginFailed(err.message));
    }
}

function* handleLogout() {
    localStorage.removeItem('access_token');
    // redirect to admin page
    yield put(push('/admin/dashboard'));
}

function* watchLoginFlow() {
    while (true) {
        const isLoggedIn = Boolean(localStorage.getItem('access_token'));
        if (!isLoggedIn) {
            const action: PayloadAction<LoginPayload> = yield take(login.type);
            yield fork(handleLogin, action.payload);
        }

        yield take(logout.type);
        yield call(handleLogout);
    }
}

export default function* authSaga() {
    yield fork(watchLoginFlow);
}
