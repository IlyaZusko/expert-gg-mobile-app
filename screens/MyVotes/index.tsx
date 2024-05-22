import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, View, RefreshControl } from 'react-native';
import { UIActivityIndicator } from 'react-native-indicators';

import { EmptyListMatches, VoteBlock } from '@/components';
import { useSession } from '@/context/ctx';
import { db } from '@/firebaseConfig';
import { BLACK_COLOR, WHITE_COLOR } from '@/helpers/constants/Colors';
import { useFetchBetsMatchesQuery } from '@/store/service/pandaScoreApi';

const MyVotes = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'myVotes',
  });
  const { session } = useSession();
  const [queryParams, setQueryParams] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  if (session) {
    const q = query(collection(db, 'bets'), where('user_id', '==', session));
    onSnapshot(q, (querySnapshot) => {
      const matchesId: number[] = [];
      querySnapshot.forEach((doc) => {
        matchesId.push(doc.data().match_id);
      });
      const queryStr =
        matchesId.length > 0
          ? 'filter[id]=' + matchesId.join() + '&per_page=70&page=1'
          : 'per_page=0&page=0';
      setQueryParams(queryStr);
    });
  }

  const { data, isFetching, isLoading, refetch } =
    useFetchBetsMatchesQuery(queryParams);

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };
  return (
    <View style={styles.wrapper}>
      {(isLoading || isFetching) && (
        <UIActivityIndicator color={WHITE_COLOR} size={30} />
      )}
      {data && data.length === 0 && !isFetching && !isLoading && (
        <EmptyListMatches title={t('emptyTitle')} />
      )}
      {data && data.length > 0 && !isFetching && !isLoading && (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item, index }) => <VoteBlock item={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={() => <View style={{ height: 16 }} />}
        />
      )}
    </View>
  );
};

export default MyVotes;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: BLACK_COLOR,
    paddingTop: 16,
  },
});
