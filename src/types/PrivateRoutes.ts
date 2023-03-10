import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type PrivateRoutesStackParamList = {
  Landing: undefined;
  Main: undefined;
};

export type PrivateRoutesScreenNavigationProp =
  NativeStackNavigationProp<PrivateRoutesStackParamList>;
