import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  ACCENT_BLUE_COLOR,
  COVER_COLOR,
  WHITE_COLOR,
} from '@/helpers/constants/Colors';
import { IProfile } from '@/store/models/Profile';

interface ILeaderboardHeader {
  player: IProfile;
  isForWins: boolean;
  place: number | null;
}

const LeaderboardHeader: React.FC<ILeaderboardHeader> = ({
  player,
  isForWins,
  place,
}) => {
  const userAvatar =
    player.avatar_url && player.avatar_url.length > 0
      ? { uri: player.avatar_url }
      : require('assets/images/default-avatar.svg');
  return (
    <View style={styles.wrapper}>
      <View style={styles.infoContainer}>
        <Text style={styles.mainTitle}>МЕСТО</Text>
        <Text style={styles.subTitle}>{place}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Image
          source={userAvatar}
          style={{ width: 61, height: 61, borderRadius: 10000 }}
          contentFit="contain"
        />
        <Text style={styles.nameTitle}>Я ({player.username})</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.mainTitle}>
          {isForWins ? 'ПОБЕДЫ' : 'ОБЩИЙ ВЫИГРЫШ'}
        </Text>
        <Text style={styles.subTitle}>
          {isForWins ? player.count_wins : player.total_earn}
        </Text>
      </View>
    </View>
  );
};

export default LeaderboardHeader;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    // paddingHorizontal: 40,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: COVER_COLOR,
    borderRadius: 8,
    marginVertical: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: ACCENT_BLUE_COLOR,
  },
  infoContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
  },
  mainTitle: {
    fontFamily: 'Mont_400',
    fontSize: 14,
    color: WHITE_COLOR,
    textAlign: 'center',
  },
  subTitle: {
    fontFamily: 'Mont_700',
    fontSize: 24,
    color: ACCENT_BLUE_COLOR,
  },
  nameTitle: {
    fontFamily: 'Mont_700',
    fontSize: 16,
    color: WHITE_COLOR,
  },
});
