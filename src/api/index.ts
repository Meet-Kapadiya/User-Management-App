import {AuthUser, User} from '../redux/store.types';
import AppAxios from './Interceptor';
import {ApiResponse, LoginParams} from './response.types';

export const loginApiHandler = async (data: LoginParams): Promise<AuthUser> => {
  try {
    const response = await AppAxios.post<AuthUser>(
      'https://dummyjson.com/auth/login',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (e) {
    throw e;
  }
};

export const getUsersApiHandler = async (
  page: number,
): Promise<ApiResponse<User[]>> => {
  try {
    const response = await AppAxios.get<ApiResponse<User[]>>(
      'https://randomuser.me/api/',
      {
        params: {
          page,
          results: 10,
        },
      },
    );

    return response.data;
  } catch (e) {
    throw e;
  }
};
