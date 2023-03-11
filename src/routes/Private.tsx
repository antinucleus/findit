import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Main, Landing, Result} from '@/features/game/routes';
import {PrivateRoutesStackParamList} from '@/types';

const {Navigator, Screen} =
  createNativeStackNavigator<PrivateRoutesStackParamList>();

export const Private = () => {
  return (
    <Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Landing" component={Landing} />
      <Screen name="Main" component={Main} />
      <Screen name="Result" component={Result} />
    </Navigator>
  );
};
