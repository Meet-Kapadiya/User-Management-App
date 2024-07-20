import store from '../redux';
import {logoutUser} from '../redux/Auth';
import {clearUsers} from '../redux/Users';
import AppAxios from './Instance';

AppAxios.interceptors.request.use(request => {
  const storeData = store.getState();

  if (storeData?.Network?.isInternetReachable !== true) {
    return Promise.reject(new Error('No Internet Connection'));
  }

  if (storeData?.Auth?.user?.token) {
    request.headers.Authorization = `Bearer ${storeData?.Auth?.user?.token}`;
  }

  return request;
});

AppAxios.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    const status = error?.response?.status || error?.status;

    if (status === 401) {
      store.dispatch(logoutUser());
      store.dispatch(clearUsers());
    }

    if (error?.response) {
      throw error?.response;
    } else {
      throw error;
    }
  },
);

export default AppAxios;
