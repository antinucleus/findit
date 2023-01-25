import * as React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Routes} from '@/routes';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Routes />
        <Toast />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
