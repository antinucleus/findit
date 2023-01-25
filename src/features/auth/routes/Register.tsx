import React, {useEffect} from 'react';
import {View, Text, Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const Register = () => {
  const navigation = useNavigation();

  useEffect(() => {
    Linking.getInitialURL()
      .then(url => {
        handleOpenURL(url);
      })
      .catch(err => console.log('Err:', err));

    return () => {
      Linking.removeSubscription('url');
    };
  }, []);

  const handleOpenURL = event => {
    navigate(event.url);
  };

  const navigate = url => {
    const route = url.replace(/.*?:\/\//g, '');
    const id = route.match(/\/([^\/]+)\/?$/)[1];
    const routeName = route.split('/')[0];

    if (routeName === 'login') {
      navigation.navigate('Login', {id, name: 'hello'});
    }
  };

  return <Text>Hello from Register!</Text>;
};
