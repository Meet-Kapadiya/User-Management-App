import {RouteProp} from '@react-navigation/native';
import {AuthNavParamList, AuthNavigation} from './AuthNav';
import {AppNavigation, AppStackParamList} from './AppNav';

export interface AppNavScreenProps<
  S extends keyof AppStackParamList = keyof AppStackParamList,
> {
  navigation: AppNavigation;
  route: RouteProp<AppStackParamList, S>;
}

export interface AuthNavScreenProps<
  S extends keyof AuthNavParamList = keyof AuthNavParamList,
> {
  navigation: AuthNavigation;
  route: RouteProp<AuthNavParamList, S>;
}
