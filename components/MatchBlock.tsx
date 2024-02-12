import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import {
  ACCENT_BLUE_COLOR,
  BLACK_COLOR,
  COVER_COLOR,
  INACTIVE_COLOR,
  WHITE_COLOR,
} from '@/constants/Colors';

const MatchBlock = ({ item }) => {
  return (
    <View style={styles.wrapper}>
      {item.isVoted && (
        <View style={styles.votedBadge}>
          <Text style={styles.votedBadgeTitle}>Voted</Text>
        </View>
      )}
      <Text style={styles.championshipTitle}>{item.championship}</Text>
      <View style={styles.teamsButtonsContainer}>
        <TouchableOpacity
          style={[
            styles.teamButton,
            { justifyContent: 'flex-end', paddingRight: 16 },
          ]}
        >
          <Text style={styles.teamButtonTitle}>{item.team_1}</Text>
          <Image
            source={require('assets/icons/small-logo.svg')}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
        <Text style={styles.versusTitle}>VS</Text>
        <TouchableOpacity style={[styles.teamButton, { paddingLeft: 16 }]}>
          <Image
            source={require('assets/icons/small-logo.svg')}
            style={{ width: 24, height: 24 }}
          />
          <Text style={styles.teamButtonTitle}>{item.team_2}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.clockContainer}>
        <Image
          source={require('assets/icons/clock.svg')}
          style={{ width: 12, height: 12 }}
        />
        <Text style={styles.clockTitle}>{item.date}</Text>
      </View>
    </View>
  );
};

export default MatchBlock;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: COVER_COLOR,
    paddingHorizontal: 8,
    paddingTop: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    borderRadius: 8,
  },
  championshipTitle: {
    fontFamily: 'Mont_500',
    fontSize: 14,
    color: '#959595',
  },
  teamsButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  teamButton: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: INACTIVE_COLOR,
    borderRadius: 8,
  },
  versusTitle: {
    fontFamily: 'Mont_400',
    fontSize: 16,
    color: WHITE_COLOR,
  },
  teamButtonTitle: {
    fontFamily: 'Mont_400',
    fontSize: 12,
    color: WHITE_COLOR,
  },
  clockContainer: {
    backgroundColor: BLACK_COLOR,
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
  },
  clockTitle: {
    fontFamily: 'Mont_400',
    fontSize: 14,
    color: '#959595',
  },
  votedBadge: {
    position: 'absolute',
    top: 12,
    left: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: ACCENT_BLUE_COLOR,
    borderRadius: 10000,
  },
  votedBadgeTitle: {
    fontFamily: 'Mont_400',
    fontSize: 12,
    color: WHITE_COLOR,
  },
});
