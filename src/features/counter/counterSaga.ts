import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { fetchCount } from './counterAPI';
import { increment, incrementSaga, incrementSagaSuccess } from './counterSlice';

export function* log(action: PayloadAction) {
    console.log('Log', action);
}

export function* test(action: PayloadAction) {
    yield fetchCount(2);
    yield call(fetchCount, 2);
}

export function* handleIncrementSaga(action: PayloadAction) {
    console.log('handleIncrementSaga', action);
    yield delay(2000);
    console.log('Delay done');
    yield put(incrementSagaSuccess(action.payload));
}

export default function* counterSaga() {
    console.log('counter saga');
    yield takeLatest(incrementSaga.toString(), handleIncrementSaga);
}
