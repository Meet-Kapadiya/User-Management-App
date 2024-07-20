import React, {memo, useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import {KeyboardAvoidingView, ScrollView, StyleSheet, Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {Fonts, Images} from '../../assets';
import Button from '../../components/Button';
import Input from '../../components/Input';
import TextButton from '../../components/TextButton';
import {AppConstants} from '../../constants';
import {GlobalStyle} from '../../constants/styles';
import {StoreDispatch} from '../../redux/store.types';
import {Colors} from '../../theme';
import {CustomError} from '../../utils/CustomError';
import {loginApiHandler} from '../../api';
import {updateUser} from '../../redux/Auth';
import {closeSpinner, openSpinner} from '../../navigation';
import {delay} from '../../utils/Delay';

type Form = {
  username: string;
  password: string;
};

const Login = () => {
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<Form>({
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    defaultValues: {
      username: __DEV__ ? 'sophiab' : '',
      password: __DEV__ ? 'sophiabpass' : '',
    },
  });

  const {top, bottom} = useSafeAreaInsets();
  const dispatch = useDispatch<StoreDispatch>();

  const [visibility, setVisibility] = useState<boolean>(false);

  const toggleVisibilityHandler = useCallback(() => {
    setVisibility(prevState => !prevState);
  }, []);

  const loginHandler = useCallback(
    async (data: Form) => {
      try {
        openSpinner();
        await delay(250);
        const response = await loginApiHandler(data);
        dispatch(updateUser(response));
      } catch (error) {
        CustomError(error);
      } finally {
        closeSpinner();
      }
    },
    [dispatch],
  );

  return (
    <KeyboardAvoidingView
      style={GlobalStyle.flex1}
      behavior={AppConstants.isIOS ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={[
          styles.root,
          {paddingBottom: bottom + 16, paddingTop: top + 16},
        ]}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{'Login'}</Text>
        <Input
          style={styles.input}
          control={control}
          name="username"
          errorMessage={errors?.username?.message}
          placeholder="Your username"
        />
        <Input
          style={styles.input}
          control={control}
          name="password"
          rules={{
            minLength: {
              value: 6,
              message: 'Password length should be atleast 6',
            },
          }}
          errorMessage={errors?.password?.message}
          placeholder="Password"
          rIcon={visibility ? Images.eyeClosed : Images.eyeOpened}
          inputConfig={{
            secureTextEntry: !visibility,
          }}
          onPress={toggleVisibilityHandler}
        />
        <TextButton
          label="Forgot password?"
          style={styles.forgotPassBtn}
          labelStyle={styles.forgotPassTxt}
        />
        <Button
          label="Login"
          style={styles.btn}
          onPress={handleSubmit(loginHandler)}
        />
        <Text style={styles.footerTxt}>{'Don’t have an account?'}</Text>
        <TextButton label="Create Account" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default memo(Login);

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: RFValue(16, AppConstants.height),
    color: Colors.blue4FD,
    fontFamily: Fonts.Gotham500,
    marginBottom: 32,
  },
  input: {
    marginBottom: 28,
  },
  forgotPassBtn: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPassTxt: {
    fontSize: RFValue(14, AppConstants.height),
    color: Colors.white9FA,
    fontFamily: Fonts.Gotham400,
    textDecorationLine: undefined,
  },
  btn: {
    marginBottom: 32,
  },
  footerTxt: {
    fontSize: RFValue(14, AppConstants.height),
    color: Colors.white9FA,
    fontFamily: Fonts.Gotham400,
    textAlign: 'center',
    marginBottom: 12,
  },
});
