import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Modal,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {Fonts} from '../assets';
import {Colors} from '../theme';
import Button from './Button';
import {RFValue} from 'react-native-responsive-fontsize';
import {AppConstants} from '../constants';

export interface PopupHandle {
  open: () => void;
  close: () => void;
}

interface PopupProps {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  desc?: string;
  descStyle?: StyleProp<TextStyle>;
  btn1Txt?: string;
  btn1Style?: StyleProp<ViewStyle>;
  btn1TxtStyle?: StyleProp<TextStyle>;
  btn2Txt?: string;
  btn2Style?: StyleProp<ViewStyle>;
  btn2TxtStyle?: StyleProp<TextStyle>;
  onConfirm?: () => void;
}

const Popup = forwardRef<PopupHandle, PopupProps>((props, ref) => {
  const {
    title,
    titleStyle,
    desc,
    descStyle,
    btn1Txt,
    btn1Style,
    btn1TxtStyle,
    btn2Txt,
    btn2Style,
    btn2TxtStyle,
    onConfirm,
  } = props;

  const [visible, setVisible] = useState<boolean>(false);

  const dismissHandler = useCallback(() => {
    setVisible(false);
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => {
          setVisible(true);
        },
        close: dismissHandler,
      };
    },
    [dismissHandler],
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      presentationStyle="overFullScreen"
      onRequestClose={dismissHandler}>
      <View style={styles.modal}>
        <View style={styles.root}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
          <Text style={[styles.desc, descStyle]}>{desc}</Text>
          <Button
            label={btn1Txt ? btn1Txt : 'Confirm'}
            style={[styles.btn, btn1Style]}
            labelStyle={[styles.btnTxt, {color: Colors.redF62}, btn1TxtStyle]}
            onPress={onConfirm}
          />
          {btn2Txt !== '' ? (
            <Button
              label={btn2Txt ? btn2Txt : 'Cancel'}
              style={[styles.btn, btn2Style]}
              labelStyle={[
                styles.btnTxt,
                {color: Colors.green078},
                btn2TxtStyle,
              ]}
              onPress={dismissHandler}
            />
          ) : null}
        </View>
      </View>
    </Modal>
  );
});

export default memo(Popup);

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  root: {
    backgroundColor: Colors.blackC32,
    borderRadius: 15,
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: RFValue(16, AppConstants.height),
    color: Colors.white,
    fontFamily: Fonts.Gotham500,
    textAlign: 'center',
  },
  desc: {
    fontSize: RFValue(14, AppConstants.height),
    color: Colors.whiteFDF,
    fontFamily: Fonts.Gotham400,
    textAlign: 'center',
  },
  btn: {
    height: 38,
    borderRadius: 10,
    backgroundColor: Colors.blackFF1A,
  },
  btnTxt: {
    fontSize: RFValue(12, AppConstants.height),
  },
});
