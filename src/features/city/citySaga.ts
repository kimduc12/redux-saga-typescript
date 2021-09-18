import { call, put, takeLatest } from '@redux-saga/core/effects';
import cityApi from 'api/cityApi';
import { City, ListResponse } from 'models';
import { cityActions } from './citySlice';

function* fetchCityList() {
    try {
        const response: ListResponse<City> = yield call(cityApi.getAll);
        console.log('fetchCityList', response);
        yield put(cityActions.fetchCityListSuccess(response));
    } catch (error) {
        console.log('fetchCityList error', error);
        yield put(cityActions.fetchCityListFailed(error.message));
    }
}

export default function* citySaga() {
    yield takeLatest(cityActions.fetchCityList.type, fetchCityList);
}
