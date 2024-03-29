import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { City, ListResponse } from 'models';
import { createSelector } from 'reselect';

export interface CityState {
    loading: boolean;
    list: City[];
}

export const initialState: CityState = {
    loading: false,
    list: [],
};

const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        fetchCityList(state) {
            state.loading = true;
        },
        fetchCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
            state.loading = false;
            state.list = action.payload.data;
        },
        fetchCityListFailed(state, action: PayloadAction<string>) {
            state.loading = false;
        },
    },
});

export const cityActions = citySlice.actions;

export const selectCityList = (state: RootState) => state.city.list;
export const selectCityMap = createSelector(selectCityList, (cityList) =>
    cityList.reduce((map: { [key: string]: City }, city) => {
        map[city.code] = city;
        return map;
    }, {})
);

export const selectCityOptions = createSelector(selectCityList, (cityList) =>
    cityList.map((city) => ({
        label: city.name,
        value: city.code,
    }))
);

const cityReducer = citySlice.reducer;
export default cityReducer;
