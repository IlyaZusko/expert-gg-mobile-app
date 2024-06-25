import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, View, RefreshControl } from 'react-native';
import { UIActivityIndicator } from 'react-native-indicators';
import { useDispatch } from 'react-redux';

import { EmptyListMatches, VoteBlock } from '@/components';
import { useSession } from '@/context/ctx';
import { db } from '@/firebaseConfig';
import { BLACK_COLOR, WHITE_COLOR } from '@/helpers/constants/Colors';
import { IBet } from '@/store/models/Bet';
import { clearListBets, setListBets } from '@/store/service/betsSlice';
import { useFetchBetsMatchesQuery } from '@/store/service/pandaScoreApi';

const MyVotes = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'myVotes',
  });
  const dispatch = useDispatch();
  const { session } = useSession();
  const [queryParams, setQueryParams] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  if (session) {
    const q = query(collection(db, 'bets'), where('user_id', '==', session));
    onSnapshot(q, (querySnapshot) => {
      dispatch(clearListBets());
      const matchesId: number[] = [];
      const newListBets: IBet[] = [];
      querySnapshot.forEach((doc) => {
        if (!doc.data().isTestMatch) {
          matchesId.push(doc.data().match_id);
        }
        newListBets.push(doc.data() as IBet);
      });
      newListBets.forEach((item) => {
        dispatch(setListBets(item));
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
    if (data) {
      data.forEach(async (bet) => {
        if (Object.keys(bet).includes('isTestMatch') && bet.document_id) {
          if (bet.match_id === 98248932) {
            await updateDoc(doc(db, 'testMatches', bet.document_id), {
              winner: {
                id: bet.bet_target_id,
                name: bet.bet_target_name,
              },
            }).catch((e) => console.log(e));
          }
          if (bet.match_id === 324366563) {
            await updateDoc(doc(db, 'testMatches', bet.document_id), {
              winner: {
                id: 1,
                name: '1',
              },
            });
          }
        }
      });
    }
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
