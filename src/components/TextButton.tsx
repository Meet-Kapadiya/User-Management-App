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
import {RFValue} from 'react-native-responsive-fontsize';
import {AppConstants} from '../constants';

type TextButtonProps = {
  style?: StyleProp<ViewStyle>;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
};

const TextButton = (props: TextButtonProps) => {
  const {style, label, labelStyle, onPress} = props;

  return (
    <Pressable
      style={({pressed}) => [
        {
          opacity: pressed ? 0.9 : 1,
        },
        style,
      ]}
      onPress={onPress}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </Pressable>
  );
};

export default memo(TextButton);

const styles = StyleSheet.create({
  label: {
    fontSize: RFValue(14, AppConstants.height),
    color: Colors.blue4FD,
    fontFamily: Fonts.Gotham500,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
