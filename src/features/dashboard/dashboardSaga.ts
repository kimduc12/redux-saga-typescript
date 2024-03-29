import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import cityApi from 'api/cityApi';
import studentApi from 'api/studentApi';
import { City, ListResponse, Student } from 'models';
import { dashboardActions, RankingByCity } from './dashboardSlice';

function* fetchStatistics() {
    const response: Array<ListResponse<Student>> = yield all([
        call(studentApi.getAll, { _limit: 1, _page: 1, gender: 'male' }),
        call(studentApi.getAll, { _limit: 1, _page: 1, gender: 'female' }),
        call(studentApi.getAll, { _limit: 1, _page: 1, mark_gte: 8 }),
        call(studentApi.getAll, { _limit: 1, _page: 1, mark_lte: 5 }),
    ]);
    const statisticsList = response.map((x) => x.pagination._totalRows);
    const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticsList;
    yield put(
        dashboardActions.setStatistics({
            maleCount,
            femaleCount,
            highMarkCount,
            lowMarkCount,
        })
    );
}
function* fetchHighestStudentList() {
    const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
        _limit: 5,
        _page: 1,
        _sort: 'mark',
        _order: 'desc',
    });

    yield put(dashboardActions.setHighestStundentList(data));
}
function* fetchLowestStudentList() {
    const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
        _limit: 5,
        _page: 1,
        _sort: 'mark',
        _order: 'asc',
    });
    yield put(dashboardActions.setLowestStundentList(data));
}
function* fetchRankingByCityList() {
    // fetch city list
    const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll);

    // fetch ranking per city
    const callList = cityList.map((x) =>
        call(studentApi.getAll, {
            _limit: 5,
            _page: 1,
            _sort: 'mark',
            _order: 'desc',
            city: x.code,
        })
    );
    const responseList: Array<ListResponse<Student>> = yield all(callList);
    const rankingByCityList: Array<RankingByCity> = responseList.map((x, idx) => ({
        cityId: cityList[idx].code,
        cityName: cityList[idx].name,
        rankingList: x.data,
    }));

    // update state
    yield put(dashboardActions.setRankingByCityList(rankingByCityList));
}

function* fetchDashboardData() {
    try {
        yield all([
            call(fetchStatistics),
            call(fetchHighestStudentList),
            call(fetchLowestStudentList),
            call(fetchRankingByCityList),
        ]);
        yield put(dashboardActions.fetchSuccess());
    } catch (err) {
        console.log('fetchDashboardData error', err);
        yield put(dashboardActions.fetchFailed());
    }
}

export default function* dashboardSaga() {
    yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData);
}
