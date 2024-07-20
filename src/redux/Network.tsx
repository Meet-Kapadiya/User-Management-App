import {createSlice} from '@reduxjs/toolkit';
import {RootStoreState} from './store.types';

const initialState: {isInternetReachable: boolean} = {
  isInternetReachable: false,
};

const NetworkSlice = createSlice({
  name: 'network',
  initialState: initialState,
  reducers: {
    setNetwork: (state, action) => {
      state.isInternetReachable = action?.payload;
    },
  },
});

export const {setNetwork} = NetworkSlice.actions;
export const NetworkState = (state: RootStoreState) => state.Network;
export default NetworkSlice.reducer;
