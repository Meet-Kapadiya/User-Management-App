import {Dimensions, Platform} from 'react-native';

export const AppConstants = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
  windowWidth: Dimensions.get('window').width,
  windowHeight: Dimensions.get('window').height,
  isAndroid: Platform.OS === 'android',
  isIOS: Platform.OS === 'ios',
};

export enum AuthScreens {
  Login = 'Login',
}

export enum AppScreens {
  Home = 'Home',
  Details = 'Details',
  Settings = 'Settings',
}
