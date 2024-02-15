import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TeamButtonSelect from './TeamButton';
import VoteStatusBadge from './VoteStatusBadge';

import {
  COVER_COLOR,
  CRICKET_GREEN_COLOR,
  ERROR_RED_COLOR,
  GOLD_COLOR,
  GREY_TEXT_COLOR,
  INACTIVE_COLOR,
  WHITE_COLOR,
} from '@/helpers/constants/Colors';

const VoteBlock = ({ item }) => {
  const teamIcon = require('assets/icons/small-logo.svg');

  const getStatusSymbol = (isWin: boolean | null) => {
    if (isWin === null) {
      return '';
    } else if (isWin) {
      return '+ ';
    } else {
      return '- ';
    }
  };

  return (
    <View style={styles.wrapper}>
      <VoteStatusBadge isWin={item.isWin} />
      <View style={styles.gameInfoContainer}>
        <Text style={styles.gameInfoTitle}>{item.game}</Text>
        <Text style={styles.gameInfoTitle}>{item.championship}</Text>
      </View>
      <View style={styles.teamsButtonsContainer}>
        <TeamButtonSelect
          teamName={item.team_1}
          teamIcon={teamIcon}
          isLeftAlign
          isDisabled
        />
        <Text style={styles.versusTitle}>VS</Text>
        <TeamButtonSelect
          teamName={item.team_2}
          teamIcon={teamIcon}
          isDisabled
        />
      </View>
      <View style={styles.betInfoContainer}>
        <Text style={styles.clockTitle}>
          {/* {dayjs(item.begin_at).format('DD.MM.YY HH:mm')} */}
          {item.date}
        </Text>
        <View style={styles.bet}>
          <Text
            style={[
              styles.gameInfoTitle,
              {
                color:
                  item.isWin === null
                    ? CRICKET_GREEN_COLOR
                    : item.isWin
                      ? GOLD_COLOR
                      : ERROR_RED_COLOR,
              },
            ]}
          >
            {getStatusSymbol(item.isWin)}
            {item.bet} gg
          </Text>
        </View>
      </View>
    </View>
  );
};

export default VoteBlock;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: COVER_COLOR,
    paddingHorizontal: 16,
    paddingTop: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    borderRadius: 8,
  },
  gameInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignSelf: 'flex-end',
  },
  gameInfoTitle: {
    fontFamily: 'Mont_400',
    fontSize: 12,
    color: GREY_TEXT_COLOR,
  },
  teamsButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  versusTitle: {
    fontFamily: 'Mont_400',
    fontSize: 16,
    color: WHITE_COLOR,
  },
  clockTitle: {
    fontFamily: 'Mont_400',
    fontSize: 12,
    color: WHITE_COLOR,
  },
  betInfoContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
  },
  bet: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: INACTIVE_COLOR,
    borderRadius: 12,
  },
});
