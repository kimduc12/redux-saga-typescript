import { call, debounce, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import studentApi from 'api/studentApi';
import { ListParams, ListResponse, Student } from 'models';
import { studentActions } from './studentSlice';

function* fetchStudentList(action: PayloadAction<ListParams>) {
    try {
        const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
        console.log('fetchStudentList', response);
        yield put(studentActions.fetchStudentSuccess(response));
    } catch (error) {
        console.log('fetchStudentList error', error);
        // yield put(studentActions.fetchStudentFailed(error.message));
    }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
    yield put(studentActions.setFilter(action.payload));
}

export default function* studentSaga() {
    console.log('studentSaga');
    yield takeLatest(studentActions.fetchStudentList.type, fetchStudentList);

    yield debounce(500, studentActions.setFilterWithDebounce.type, handleSearchDebounce);
}
