import {useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React, {memo, useCallback} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {Fonts, Images} from '../assets';
import {AppConstants, AppScreens} from '../constants';
import {User} from '../redux/store.types';
import Details from '../screens/App/Details';
import Home from '../screens/App/Home';
import Settings from '../screens/App/Settings';
import {Colors} from '../theme';

export type AppStackParamList = {
  [AppScreens.Home]: undefined;
  [AppScreens.Details]: User | undefined;
  [AppScreens.Settings]: undefined;
};

export type AppNavigation = NativeStackNavigationProp<AppStackParamList>;

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNav = () => {
  const navigation = useNavigation<AppNavigation>();

  const backHandler = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const openSettings = useCallback(() => {
    navigation.navigate(AppScreens.Settings);
  }, [navigation]);

  const HeaderLeft = useCallback(() => {
    return (
      <Pressable style={styles.backBtn} onPress={backHandler} hitSlop={16}>
        <FastImage
          source={Images.back}
          style={styles.backIcon}
          resizeMode="contain"
        />
      </Pressable>
    );
  }, [backHandler]);

  const SettingsButton = useCallback(() => {
    return (
      <Pressable style={styles.backBtn} onPress={openSettings} hitSlop={16}>
        <FastImage
          source={Images.settings}
          style={styles.settingsIcon}
          resizeMode="contain"
        />
      </Pressable>
    );
  }, [openSettings]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        contentStyle: styles.content,
        headerLeft: HeaderLeft,
        headerTitleAlign: 'center',
        headerTitleStyle: styles.headerTitle,
      }}>
      <Stack.Screen
        name={AppScreens.Home}
        component={Home}
        options={{
          headerLeft: undefined,
          headerRight: SettingsButton,
          headerTitle: 'Users',
        }}
      />
      <Stack.Screen name={AppScreens.Details} component={Details} />
      <Stack.Screen name={AppScreens.Settings} component={Settings} />
    </Stack.Navigator>
  );
};

export default memo(AppNav);

const styles = StyleSheet.create({
  backBtn: {
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blackF1F,
  },
  backIcon: {
    width: 8,
    height: 14,
  },
  settingsIcon: {
    width: 24,
    height: 24,
  },
  header: {
    backgroundColor: Colors.blackD0E,
  },
  content: {
    borderTopWidth: 1,
    borderTopColor: Colors.blackF1F,
  },
  noBorder: {
    borderTopWidth: 0,
    borderTopColor: 'transparent',
  },
  headerTitle: {
    fontFamily: Fonts.Gotham500,
    color: Colors.white,
    fontSize: RFValue(16, AppConstants.height),
  },
});
