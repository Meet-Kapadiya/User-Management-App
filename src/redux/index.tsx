import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import Auth from './Auth';
import Network from './Network';
import Users from './Users';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['Users'],
};

const combinedReducers = combineReducers({
  Auth: Auth,
  Network: Network,
  Users: Users,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
