import * as React from 'react';
import {SafeAreaView, Text} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/FontAwesome';

function App() {
  // Subscribe
  const unsubscribe = NetInfo.addEventListener(state => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
  });

  // Unsubscribe
  unsubscribe();

  return (
    <SafeAreaView>
      <Text>Initial</Text>
      <Icon name="rocket" />
    </SafeAreaView>
  );
}

export default App;
