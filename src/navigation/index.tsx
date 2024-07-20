import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {memo, useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {GlobalStyle} from '../constants/styles';
import {AuthState} from '../redux/Auth';
import AppNav from './AppNav';
import AuthNav from './AuthNav';
import {Colors} from '../theme';
import Spinner, {SpinnerHandler} from '../components/Spinner';
import NetInfo from '@react-native-community/netinfo';
import {setNetwork} from '../redux/Network';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.blackD0E,
  },
};

const spinnerRef = React.createRef<SpinnerHandler>();

export const openSpinner = () => {
  spinnerRef?.current?.open();
};

export const closeSpinner = () => {
  spinnerRef?.current?.close();
};

const RootNav = () => {
  const {user} = useSelector(AuthState);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setNetwork(state.isInternetReachable));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <View style={GlobalStyle.flex1}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />
      <NavigationContainer theme={navTheme}>
        {user?.token ? <AppNav /> : <AuthNav />}
      </NavigationContainer>
      <Spinner ref={spinnerRef} />
    </View>
  );
};

export default memo(RootNav);
