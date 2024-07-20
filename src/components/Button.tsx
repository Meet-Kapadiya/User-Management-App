import React, {memo} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {Fonts} from '../assets';
import {Colors} from '../theme';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import {AppConstants} from '../constants';
import {RFValue} from 'react-native-responsive-fontsize';

interface ButtonProps {
  style?: StyleProp<ViewStyle>;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  icon?: FastImageProps['source'];
  iconStyle?: FastImageProps['style'];
  onPress?: () => void;
}

const Button = (props: ButtonProps) => {
  const {style, label, labelStyle, icon, iconStyle, onPress} = props;

  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        style,
        {opacity: pressed ? 0.9 : 1},
      ]}
      onPress={onPress}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      {icon ? (
        <FastImage
          style={[styles.icon, iconStyle]}
          source={icon}
          resizeMode="contain"
        />
      ) : null}
    </Pressable>
  );
};

export default memo(Button);

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue4FD,
  },
  label: {
    fontSize: RFValue(14, AppConstants.height),
    color: Colors.blackD0E,
    fontFamily: Fonts.Gotham500,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
