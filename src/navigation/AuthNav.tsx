import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React, {memo} from 'react';
import {AuthScreens} from '../constants';
import Login from '../screens/Auth/Login';

export type AuthNavParamList = {
  [AuthScreens.Login]: undefined;
};

export type AuthNavigation = NativeStackNavigationProp<AuthNavParamList>;

const Stack = createNativeStackNavigator<AuthNavParamList>();

const AuthNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={AuthScreens.Login} component={Login} />
    </Stack.Navigator>
  );
};

export default memo(AuthNav);
