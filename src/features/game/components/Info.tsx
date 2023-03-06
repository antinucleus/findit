import {CustomText} from '@/components';
import React from 'react';
import {View, StyleSheet} from 'react-native';

type Props = {
  title: string;
  content: string;
};

export const Info = ({title, content}: Props) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>{title}:</CustomText>
      <CustomText style={styles.content}>{content}</CustomText>
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
  content: {color: '#fff', fontSize: 16},
  title: {color: '#fff', fontSize: 20},
});
