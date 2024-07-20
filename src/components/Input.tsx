import React, {memo} from 'react';
import {
  Control,
  Controller,
  RegisterOptions,
  UseControllerProps,
} from 'react-hook-form';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import {Fonts} from '../assets';
import {Colors} from '../theme';
import {RFValue} from 'react-native-responsive-fontsize';
import {AppConstants} from '../constants';

interface InputProps {
  style?: StyleProp<ViewStyle>;
  inputStyle?: TextInputProps['style'];
  errorMessage?: string;
  defaultValue?: string;
  inputConfig?: TextInputProps;
  control: Control<any>;
  name: string;
  validation?: RegisterOptions['validate'];
  placeholder?: string;
  onPress?: () => void;
  editable?: boolean;
  rules?: UseControllerProps['rules'];
  lIcon?: FastImageProps['source'];
  lIconStyle?: FastImageProps['style'];
  rIconContStyle?: PressableProps['style'];
  rIcon?: FastImageProps['source'];
  rIconStyle?: FastImageProps['style'];
}

const Input = (props: InputProps): React.JSX.Element => {
  const {
    style,
    defaultValue,
    inputStyle,
    errorMessage,
    inputConfig,
    control,
    name,
    placeholder,
    editable,
    rules,
    lIcon,
    lIconStyle,
    rIconContStyle,
    rIcon,
    rIconStyle,
    onPress,
  } = props;

  return (
    <View style={[styles.inputView, style]}>
      {lIcon ? (
        <FastImage
          source={lIcon}
          style={[styles.icon, lIconStyle]}
          resizeMode="contain"
        />
      ) : null}
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={{
          validate: value => {
            return value.trim().length > 0 || 'This field is required';
          },
          ...rules,
        }}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={[styles.input, inputStyle]}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder={placeholder}
            placeholderTextColor={Colors.black939}
            cursorColor={Colors.whiteFDF}
            editable={editable}
            {...inputConfig}
          />
        )}
      />
      {rIcon ? (
        <Pressable onPress={onPress} style={rIconContStyle}>
          <FastImage
            source={rIcon}
            style={[styles.icon, rIconStyle]}
            resizeMode="contain"
          />
        </Pressable>
      ) : null}
      {errorMessage ? (
        <Text style={styles.errorStyle}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    height: 49,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.black848,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontFamily: Fonts.Gotham500,
    fontSize: RFValue(16, AppConstants.height),
    color: Colors.whiteFDF,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  icon: {
    width: 24,
    height: 24,
  },
  errorStyle: {
    color: Colors.red,
    fontSize: RFValue(12, AppConstants.height),
    fontFamily: Fonts.Gotham500,
    position: 'absolute',
    bottom: -14,
  },
});

export default memo(Input);
