import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {PrivateRoutesScreenNavigationProp} from '@/types';

export const Landing = () => {
  const navigation = useNavigation<PrivateRoutesScreenNavigationProp>();

  const handleGoInside = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find It</Text>
      <View>
        <TouchableOpacity onPress={handleGoInside}>
          <Text style={styles.menuTitle}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#5390D9',
  },
  menuTitle: {
    fontSize: 20,
    marginVertical: 10,
    color: '#FFF',
  },
  title: {
    marginBottom: 20,
    fontSize: 35,
    fontFamily: 'griffy-regular',
    color: '#FFF',
  },
});
