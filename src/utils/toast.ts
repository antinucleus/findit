import Toast from 'react-native-toast-message';

type Params = {
  type: 'success' | 'error' | 'info';
  title: string;
  description: string;
};

export const showToast = ({title, description, type}: Params) =>
  Toast.show({
    text1: title || ' ',
    text2: description || ' ',
    type,
    autoHide: true,
    visibilityTime: 3 * 1000, // 5000 ms
    position: 'bottom',
  });
