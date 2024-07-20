import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootStoreState, AuthUser} from './store.types';

const initialState: {user: AuthUser} = {
  user: {},
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = {...state.user, ...action.payload};
    },
    logoutUser: state => {
      state.user = {};
    },
  },
});

export default AuthSlice.reducer;
export const AuthState = (state: RootStoreState) => state.Auth;
export const {updateUser, logoutUser} = AuthSlice.actions;
