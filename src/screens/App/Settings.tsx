import React, {memo, useCallback, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch} from 'react-redux';
import {Fonts, Images} from '../../assets';
import Button from '../../components/Button';
import Popup, {PopupHandle} from '../../components/Popup';
import {AppConstants} from '../../constants';
import {logoutUser} from '../../redux/Auth';
import {StoreDispatch} from '../../redux/store.types';
import {Colors} from '../../theme';
import {delay} from '../../utils/Delay';
import {SuccessToast} from '../../utils/Toasts';
import {clearUsers} from '../../redux/Users';

const Settings = () => {
  const dispatch = useDispatch<StoreDispatch>();
  const logoutAlertRef = useRef<PopupHandle>(null);

  const logoutAlertHandler = useCallback(() => {
    logoutAlertRef?.current?.open();
  }, []);

  const logoutHandler = useCallback(async () => {
    logoutAlertRef?.current?.close();
    await delay(250);
    dispatch(logoutUser());
    dispatch(clearUsers());
    SuccessToast('Logout Successful');
  }, [dispatch]);

  return (
    <View style={styles.root}>
      <Button
        style={styles.btn}
        label="Logout"
        labelStyle={styles.btnLabel}
        icon={Images.next}
        iconStyle={styles.icon}
        onPress={logoutAlertHandler}
      />
      <Popup
        ref={logoutAlertRef}
        title={'Goodbye for Now?'}
        desc={"We'll miss you! Come back soon."}
        onConfirm={logoutHandler}
      />
    </View>
  );
};

export default memo(Settings);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  btn: {
    backgroundColor: Colors.blackF1F,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  btnLabel: {
    fontSize: RFValue(16, AppConstants.height),
    color: Colors.white,
    fontFamily: Fonts.Gotham400,
  },
  icon: {
    width: 24,
    height: 12,
  },
});
