import React, { useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import { GameSelectorButton, MatchBlock } from '@/components';
import {
  ACCENT_BLUE_COLOR,
  BLACK_COLOR,
  WHITE_COLOR,
} from '@/constants/Colors';
const DATA = [
  {
    id: '1',
    title: 'League of Legends',
    imageUrl: require('assets/icons/lol-game.svg'),
  },
  {
    id: '2',
    title: 'Counter-Strike',
    imageUrl: require('assets/icons/cs-game.svg'),
  },
  {
    id: '3',
    title: 'Valorant',
    imageUrl: require('assets/icons/valorant-game.svg'),
  },
];

const DATA_MATCHES = [
  {
    id: 1,
    championship: 'Malta Vibes',
    team_1: 'Entropiq',
    team_2: 'Trasko',
    date: '24.03.24 13:30',
    isVoted: true,
  },
  {
    id: 2,
    championship: 'Malta Vibes',
    team_1: 'Entropiq',
    team_2: 'Trasko',
    date: '24.03.24 13:30',
  },
  {
    id: 3,
    championship: 'Malta Vibes',
    team_1: 'Entropiq',
    team_2: 'Trasko',
    date: '24.03.24 13:30',
  },
  {
    id: 4,
    championship: 'Malta Vibes',
    team_1: 'Entropiq',
    team_2: 'Trasko',
    date: '24.03.24 13:30',
  },
  {
    id: 5,
    championship: 'Malta Vibes',
    team_1: 'Entropiq',
    team_2: 'Trasko',
    date: '24.03.24 13:30',
  },
  {
    id: 6,
    championship: 'Malta Vibes',
    team_1: 'Entropiq',
    team_2: 'Trasko',
    date: '24.03.24 13:30',
  },
];

const Play = () => {
  const [selectedGame, setSelectedGame] = useState<string>('2');
  const [selectedFilter, setSelectedFilter] = useState<number>(1);

  return (
    <View style={styles.wrapper}>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {DATA.map((item) => (
            <GameSelectorButton
              title={item.title}
              imageUrl={item.imageUrl}
              key={item.id}
              id={item.id}
              checkedKey={selectedGame}
              onClick={(key) => setSelectedGame(key)}
            />
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={DATA_MATCHES}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <MatchBlock item={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ListHeaderComponent={() => {
          if (DATA_MATCHES.length > 0) {
            return (
              <View style={styles.headerWrapper}>
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    {
                      backgroundColor:
                        selectedFilter === 1 ? ACCENT_BLUE_COLOR : '',
                      borderTopLeftRadius: 10000,
                      borderBottomLeftRadius: 10000,
                    },
                  ]}
                  onPress={() => setSelectedFilter(1)}
                >
                  <Text style={styles.filterButtonTitle}>Сегодня</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    {
                      borderRightWidth: 1,
                      borderLeftWidth: 1,
                      borderColor: ACCENT_BLUE_COLOR,
                      backgroundColor:
                        selectedFilter === 2 ? ACCENT_BLUE_COLOR : '',
                    },
                  ]}
                  onPress={() => setSelectedFilter(2)}
                >
                  <Text style={styles.filterButtonTitle}>Завтра</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    {
                      backgroundColor:
                        selectedFilter === 3 ? ACCENT_BLUE_COLOR : '',
                      borderTopRightRadius: 10000,
                      borderBottomRightRadius: 10000,
                    },
                  ]}
                  onPress={() => setSelectedFilter(3)}
                >
                  <Text style={styles.filterButtonTitle}>Неделя</Text>
                </TouchableOpacity>
              </View>
            );
          }
        }}
        ListFooterComponent={() => <View style={{ height: 16 }} />}
        // ListEmptyComponent={() => {
        //   return (
        //     <View style={styles.exmptyListWrapper}>
        //       <Text style={styles.emptyListMainTitle}>
        //         Your profile is incomplete!
        //       </Text>
        //       <Text style={styles.emptyListSubTitle}>
        //         Scouts are actively looking for talents like you. You can add
        //         videos to highlight your skills.
        //       </Text>
        //       <View style={styles.uploadTip}>
        //         <Text style={[styles.emptyListSubTitle, { color: '#9B9B9B' }]}>
        //           Tap
        //         </Text>
        //         <View style={styles.addCircleContainer}>
        //           <Image
        //             source={require('assets/icons/plus-icon.svg')}
        //             style={{ width: 15, height: 15 }}
        //           />
        //         </View>
        //         <Text style={[styles.emptyListSubTitle, { color: '#9B9B9B' }]}>
        //           to upload a video.
        //         </Text>
        //       </View>
        //     </View>
        //   );
        // }}
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
  headerWrapper: {
    width: '100%',
    marginVertical: 24,
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: ACCENT_BLUE_COLOR,
    borderRadius: 10000,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonTitle: {
    fontFamily: 'Mont_500',
    fontSize: 14,
    color: WHITE_COLOR,
  },
});
