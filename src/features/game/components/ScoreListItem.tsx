import {CustomText} from '@/components';
import {formatDate} from '@/utils';
import React from 'react';
import {StyleSheet, View} from 'react-native';

import {UserData} from '../types';

type Props = {
  item: UserData;
};

export const ScoreListItem = ({item: {score, username, time}}: Props) => {
  const {day, month, year, t} = formatDate(time);

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <CustomText style={styles.text}>{day}</CustomText>
        <CustomText style={styles.text}>
          {month}
          <CustomText style={styles.text}>{year}</CustomText>
        </CustomText>
        <CustomText style={styles.text}>{t}</CustomText>
      </View>
      <View>
        <CustomText style={styles.usernameText}>{username} </CustomText>
      </View>

      <View>
        <CustomText style={styles.scoreText}>{score} </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
    marginVertical: 10,
    padding: 5,
    borderRadius: 10,
  },
  dateContainer: {
    alignItems: 'center',
  },
  text: {fontSize: 16},
  usernameText: {
    fontSize: 20,
  },
  scoreText: {
    fontSize: 20,
  },
});
