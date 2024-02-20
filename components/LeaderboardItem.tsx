import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COVER_COLOR, WHITE_COLOR } from '@/helpers/constants/Colors';
import { IProfile } from '@/store/models/Profile';

interface ILeaderboardItem {
  item: IProfile;
  place: number;
  isForWins: boolean;
}

const LeaderboardItem: React.FC<ILeaderboardItem> = ({
  item,
  place,
  isForWins,
}) => {
  const userAvatar =
    item.avatar_url.length !== 0
      ? { uri: item.avatar_url }
      : require('assets/images/default-avatar.svg');

  const getWinTitle = (count: number): string => {
    const remainder10 = count % 10;
    const remainder100 = count % 100;

    if (remainder10 === 1 && remainder100 !== 11) {
      return count + ' победа';
    } else if (
      [2, 3, 4].includes(remainder10) &&
      ![12, 13, 14].includes(remainder100)
    ) {
      return count + ' победы';
    } else {
      return count + ' побед';
    }
  };

  return (
    <View style={styles.leaderBoardItem}>
      <View style={styles.userInfoContainer}>
        <Text style={styles.placeTitle}>{place}</Text>
        <Image
          source={userAvatar}
          style={{ width: 32, height: 32, borderRadius: 100000 }}
        />
        <Text style={styles.userNameTitle}>{item.username}</Text>
      </View>
      <Text style={styles.countTitle}>
        {isForWins ? getWinTitle(item.count_wins) : item.total_earn + ' GG'}
      </Text>
    </View>
  );
};

export default LeaderboardItem;

const styles = StyleSheet.create({
  leaderBoardItem: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 18,
    backgroundColor: COVER_COLOR,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeTitle: {
    fontFamily: 'Mont_400',
    fontSize: 14,
    color: WHITE_COLOR,
    width: 40,
  },
  userNameTitle: {
    fontFamily: 'Mont_600',
    fontSize: 14,
    color: WHITE_COLOR,
    marginLeft: 8,
  },
  countTitle: {
    fontFamily: 'Mont_400',
    fontSize: 14,
    color: WHITE_COLOR,
  },
});
