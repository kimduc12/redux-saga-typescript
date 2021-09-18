import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'models';

export interface LoginPayload {
    username: string;
    password: string;
}

export interface authState {
    isLoggedIn: boolean;
    logging?: boolean;
    currentUser?: User;
}

const initialState: authState = {
    isLoggedIn: false,
    logging: false,
    currentUser: undefined,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginPayload>) => {
            state.logging = true;
        },
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.logging = false;
            state.isLoggedIn = true;
            state.currentUser = action.payload;
        },
        loginFailed: (state, action: PayloadAction<string>) => {
            state.logging = false;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.currentUser = undefined;
        },
    },
});

export const { login, loginSuccess, loginFailed, logout } = authSlice.actions;

// Selector
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectIsLogging = (state: any) => state.auth.logging;
const authReducer = authSlice.reducer;
export default authReducer;
