import React, {memo} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast, {ToastConfigParams} from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Fonts, Images} from './src/assets';
import {AppConstants} from './src/constants';
import {GlobalStyle} from './src/constants/styles';
import RootNav from './src/navigation';
import store, {persistor} from './src/redux';
import {Colors} from './src/theme';
import {RFValue} from 'react-native-responsive-fontsize';

interface ToastProps {
  text: string;
  visibilityTime: number;
}

if (!__DEV__) {
  console.log = () => null;
  console.warn = () => null;
  console.error = () => null;
}

const toastConfig = {
  success: (params: ToastConfigParams<ToastProps>) => {
    const {text, visibilityTime} = params.props;

    const fillAnimation = React.createRef<Animated.Value>();
    // @ts-ignore
    fillAnimation.current = new Animated.Value(0);

    Animated.timing(fillAnimation.current, {
      toValue: 1,
      duration: visibilityTime,
      useNativeDriver: false,
    }).start();

    return (
      <View style={styles.toast}>
        <View style={styles.toastMsgCont}>
          <View style={styles.toastIconCont}>
            <FastImage
              source={Images.success}
              resizeMode="contain"
              style={styles.toastIcon}
            />
          </View>
          <Text style={styles.toastText} numberOfLines={4}>
            {text}
          </Text>
        </View>
        <Animated.View
          style={[
            styles.toastIndicator,
            {
              width: fillAnimation.current.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
              backgroundColor: Colors.greenF80,
            },
          ]}
        />
      </View>
    );
  },
  error: (params: ToastConfigParams<ToastProps>) => {
    const {text, visibilityTime} = params.props;

    const fillAnimation = React.createRef<Animated.Value>();
    // @ts-ignore
    fillAnimation.current = new Animated.Value(0);

    Animated.timing(fillAnimation.current, {
      toValue: 1,
      duration: visibilityTime,
      useNativeDriver: false,
    }).start();

    return (
      <View style={styles.toast}>
        <View style={styles.toastMsgCont}>
          <View style={styles.toastIconCont}>
            <FastImage
              source={Images.error}
              resizeMode="contain"
              style={styles.toastIcon}
            />
          </View>
          <Text style={styles.toastText} numberOfLines={4}>
            {text}
          </Text>
        </View>
        <Animated.View
          style={[
            styles.toastIndicator,
            {
              width: fillAnimation.current.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
              backgroundColor: Colors.redD65,
            },
          ]}
        />
      </View>
    );
  },
};

const App = () => {
  return (
    <View style={GlobalStyle.flex1}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SafeAreaProvider>
            <RootNav />
            <Toast config={toastConfig} />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </View>
  );
};

export default memo(App);

const styles = StyleSheet.create({
  toast: {
    width: AppConstants.width - 40,
    backgroundColor: Colors.blackC32,
    gap: 12,
    borderRadius: 15,
    paddingTop: 16,
    overflow: 'hidden',
  },
  toastMsgCont: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },
  toastIconCont: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: Colors.black746,
  },
  toastIcon: {
    width: 20,
    height: 20,
  },
  toastText: {
    flex: 1,
    fontSize: RFValue(16, AppConstants.height),
    color: Colors.white,
    fontFamily: Fonts.Gotham400,
  },
  toastIndicator: {
    height: 5,
  },
});
