import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Student } from 'models';

export interface dashboardStatistics {
    maleCount: number;
    femaleCount: number;
    highMarkCount: number;
    lowMarkCount: number;
}

export interface RankingByCity {
    cityId: string;
    cityName: string;
    rankingList: Student[];
}

export interface dashboardState {
    loading: boolean;
    statistics: dashboardStatistics;
    highestStundentList: Student[];
    lowestStundentList: Student[];
    rankingByCityList: RankingByCity[];
}

const initialState: dashboardState = {
    loading: false,
    statistics: {
        maleCount: 0,
        femaleCount: 0,
        highMarkCount: 0,
        lowMarkCount: 0,
    },
    highestStundentList: [],
    lowestStundentList: [],
    rankingByCityList: [],
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: initialState,
    reducers: {
        fetchData(state) {
            state.loading = true;
        },
        fetchSuccess(state) {
            state.loading = false;
        },
        fetchFailed(state) {
            state.loading = false;
        },

        setStatistics(state, action: PayloadAction<dashboardStatistics>) {
            state.statistics = action.payload;
        },
        setHighestStundentList(state, action: PayloadAction<Student[]>) {
            state.highestStundentList = action.payload;
        },
        setLowestStundentList(state, action: PayloadAction<Student[]>) {
            state.lowestStundentList = action.payload;
        },
        setRankingByCityList(state, action: PayloadAction<RankingByCity[]>) {
            state.rankingByCityList = action.payload;
        },
    },
});

// Actions
export const dashboardActions = dashboardSlice.actions;

// Selectors
export const selectDashboardLoading = (state: RootState) => state.dashboard.loading;
export const selectStatistics = (state: RootState) => state.dashboard.statistics;
export const selectHighestStundentList = (state: RootState) => state.dashboard.highestStundentList;
export const selectLowestStundentList = (state: RootState) => state.dashboard.lowestStundentList;
export const selectRankingByCityList = (state: RootState) => state.dashboard.rankingByCityList;

// Reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
