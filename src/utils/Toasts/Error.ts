import Toast from 'react-native-toast-message';

export const ErrorToast = (message: string, visibilityTime?: number) => {
  Toast.show({
    type: 'error',
    visibilityTime: visibilityTime ? visibilityTime : 3000,
    props: {
      text: message,
      visibilityTime: visibilityTime ? visibilityTime : 3000,
    },
  });
};
