import {ErrorToast} from './Toasts';

export const CustomError = (error: any, duration?: number) => {
  console.log('Error: ', error);

  if (error.data?.message) {
    ErrorToast(error.data.message, duration);
  } else if (error.message) {
    ErrorToast(error.message, duration);
  } else {
    ErrorToast('Something went wrong', duration);
  }
};
