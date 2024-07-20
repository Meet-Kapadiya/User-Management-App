import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getUsersApiHandler} from '../api';
import {UsersState as InitialState, RootStoreState, User} from './store.types';

const initialState: InitialState = {
  users: [],
  refreshing: false,
  loading: false,
};

let page = 0;

export const getUsers = createAsyncThunk<User[], void, {rejectValue: string}>(
  'users/getUsers',
  async (_, {rejectWithValue}) => {
    try {
      page += 1;
      const response = await getUsersApiHandler(page);
      return response.results;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const refreshUsers = createAsyncThunk<
  User[],
  void,
  {rejectValue: string}
>('users/refreshUsers', async (_, {rejectWithValue}) => {
  try {
    page = 1;
    const response = await getUsersApiHandler(page);
    return response.results;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsers: state => {
      state.users = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUsers.pending, state => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = [...state.users, ...action.payload];
      })
      .addCase(getUsers.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(refreshUsers.pending, state => {
        state.refreshing = true;
      })
      .addCase(
        refreshUsers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.refreshing = false;
          state.users = action.payload;
        },
      )
      .addCase(refreshUsers.rejected, (state, action: PayloadAction<any>) => {
        state.refreshing = false;
        state.error = action.payload;
      });
  },
});

export default UsersSlice.reducer;
export const UsersState = (state: RootStoreState) => state.Users;
export const {clearUsers} = UsersSlice.actions;
