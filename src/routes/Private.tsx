import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Main} from '@/features/game/routes';

const {Navigator, Screen} = createNativeStackNavigator();

export const Private = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Main" component={Main} />
    </Navigator>
  );
};
