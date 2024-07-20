import Toast from 'react-native-toast-message';

export const SuccessToast = (message: string, visibilityTime?: number) => {
  Toast.show({
    type: 'success',
    visibilityTime: visibilityTime ? visibilityTime : 3000,
    props: {
      text: message,
      visibilityTime: visibilityTime ? visibilityTime : 3000,
    },
  });
};
