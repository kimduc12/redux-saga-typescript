import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { fetchCount } from './counterAPI';
import { incrementSaga, incrementSagaSuccess } from './counterSlice';

export function* test(action: PayloadAction) {
    yield fetchCount(2);
    yield call(fetchCount, 2);
}

export function* handleIncrementSaga(action: PayloadAction<number>) {
    console.log('handleIncrementSaga', action);
    yield delay(2000);
    console.log('Delay done');
    yield put(incrementSagaSuccess(action.payload));
}

export default function* counterSaga() {
    console.log('counter saga');
    yield takeLatest(incrementSaga.toString(), handleIncrementSaga);
}
