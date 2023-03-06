import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  title: string;
  content: string;
};

export const Info = ({title, content}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}:</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    borderColor: '#fff',
    borderWidth: 1,
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {color: '#fff', fontSize: 13, marginLeft: 10},
  title: {color: '#fff', fontSize: 16},
});
