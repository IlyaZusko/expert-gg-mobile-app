/* eslint-disable indent */
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { UIActivityIndicator } from 'react-native-indicators';

import {
  GameSelectorButton,
  MatchBlock,
  HeaderFilterDate,
  EmptyListMatches,
} from '@/components';
import { useSession } from '@/context/ctx';
import { db } from '@/firebaseConfig';
import { BLACK_COLOR, WHITE_COLOR } from '@/helpers/constants/Colors';
import {
  TODAY_DATE_QUERY,
  TOMORROW_DATE_QUERY,
  WEEK_DATE_QUERY,
} from '@/helpers/constants/DatesQuery';
import { LIST_OF_GAMES } from '@/helpers/constants/ListOfGames';
import { IPath } from '@/store/models/Matches';
import { useFetchAllMatchesQuery } from '@/store/service/pandaScoreApi';

const Play = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'play',
  });
  const { session } = useSession();
  const [selectedGame, setSelectedGame] = useState<string>('csgo');
  const [selectedFilter, setSelectedFilter] = useState<number>(1);
  const [coins, setCoins] = useState<number | null>(null);

  const [queryParams, setQueryParams] = useState<IPath>({
    slug: 'csgo',
    queryParams: TODAY_DATE_QUERY,
  });

  const { data, isFetching, refetch } = useFetchAllMatchesQuery(queryParams);

  useEffect(() => {
    refetch();
  }, [selectedFilter]);

  const handleChangeQueryParams = (selectedFilter: number) => {
    switch (selectedFilter) {
      case 1:
        setQueryParams({
          slug: selectedGame,
          queryParams: TODAY_DATE_QUERY,
        });
        break;
      case 2:
        setQueryParams({
          slug: selectedGame,
          queryParams: TOMORROW_DATE_QUERY,
        });
        break;
      case 3:
        setQueryParams({
          slug: selectedGame,
          queryParams: WEEK_DATE_QUERY,
        });
        break;
    }
  };

  useEffect(() => {
    handleChangeQueryParams(selectedFilter);
  }, [selectedFilter, selectedGame]);

  if (session) {
    onSnapshot(doc(db, 'users', session), (doc) => {
      const data = doc.data();
      if (data) {
        setCoins(data.coins);
      }
    });
  }

  return (
    <View style={styles.wrapper}>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {LIST_OF_GAMES.map((item) => (
            <GameSelectorButton
              title={item.title}
              imageUrl={item.imageUrl}
              key={item.slug}
              id={item.slug}
              checkedKey={selectedGame}
              onClick={(key) => setSelectedGame(key)}
            />
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) =>
          isFetching && index === 0 ? (
            <UIActivityIndicator color={WHITE_COLOR} size={30} />
          ) : isFetching && index !== 0 ? (
            <View />
          ) : (
            <MatchBlock
              item={item}
              userId={session}
              refetch={refetch}
              coins={coins}
            />
          )
        }
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ListHeaderComponent={() => {
          return (
            <HeaderFilterDate
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
          );
        }}
        ListFooterComponent={() => <View style={{ height: 16 }} />}
        ListEmptyComponent={() => {
          return <EmptyListMatches title={t('emptyList')} />;
        }}
      />
    </View>
  );
};

export default Play;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: BLACK_COLOR,
    paddingTop: 16,
  },
});
