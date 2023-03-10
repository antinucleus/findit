import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {connection} from '@/config';
import {UserData} from '../types';
import {fetchPage} from '../api';
import {ScoreListItem} from './ScoreListItem';
import {Loading} from '@/components';

type Props = {
  page: number;
  pageSize: number;
};

export const ScoreList = ({page, pageSize}: Props) => {
  const [accountDatas, setAccountDatas] = useState<UserData[]>([]);

  const fetchDatas = async () => {
    const accDatas = await fetchPage(connection, page, pageSize);
    setAccountDatas(accDatas);
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  return (
    <>
      {accountDatas.length === 0 ? (
        <View style={styles.loadingContainer}>
          <Loading />
        </View>
      ) : (
        <FlatList
          style={styles.container}
          data={accountDatas}
          keyExtractor={(_, index) => index.toString()}
          renderItem={ScoreListItem}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  loadingContainer: {
    marginVertical: 30,
  },
});
