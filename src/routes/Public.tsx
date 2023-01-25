import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Login, Register} from '@/features/auth/routes';

const {Navigator, Screen} = createNativeStackNavigator();

export const Public = () => {
  return (
    <Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
      <Screen name="Register" component={Register} />
      <Screen name="Login" component={Login} />
    </Navigator>
  );
};
