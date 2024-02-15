import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { EmptyListMatches, VoteBlock } from '@/components';
import { BLACK_COLOR } from '@/helpers/constants/Colors';

const data = [
  {
    id: '1',
    team_1: 'Entropixq',
    team_2: 'Trasko',
    game: 'Counter-Strike',
    championship: 'Malta Vibes 1',
    date: '17 Jan 14:23 ',
    bet: '100',
    isWin: true,
  },
  {
    id: '2',
    team_1: 'Entropixq',
    team_2: 'Trasko',
    game: 'Counter-Strike',
    championship: 'Malta Vibes 2',
    date: '17 Jan 14:23 ',
    bet: '200',
    isWin: false,
  },
  {
    id: '3',
    team_1: 'Entropixq',
    team_2: 'Trasko',
    game: 'Counter-Strike',
    championship: 'Malta Vibes 3',
    date: '17 Jan 14:23 ',
    bet: '200',
    isWin: null,
  },
];

const MyVotes = () => {
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={
          ({ item, index }) => <VoteBlock item={item} />
          // isFetching && index === 0 ? (
          //   <UIActivityIndicator color={WHITE_COLOR} size={30} />
          // ) : isFetching && index !== 0 ? (
          //   <View />
          // ) : (
          //   <MatchBlock item={item} userId={session} refetch={refetch} />
          // )
        }
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        // ListHeaderComponent={() => {
        //   return (
        //     <HeaderFilterDate
        //       selectedFilter={selectedFilter}
        //       setSelectedFilter={setSelectedFilter}
        //     />
        //   );
        // }}
        ListFooterComponent={() => <View style={{ height: 16 }} />}
        ListEmptyComponent={() => {
          return <EmptyListMatches />;
        }}
      />
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
