import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  CRICKET_GREEN_COLOR,
  GOLD_COLOR,
  ERROR_RED_COLOR,
  ACCENT_BLUE_COLOR,
  WHITE_COLOR,
} from '@/helpers/constants/Colors';

interface IVoteStatusBadge {
  isWin?: boolean | null;
  isForMatches?: boolean;
}

const VoteStatusBadge: React.FC<IVoteStatusBadge> = ({
  isWin,
  isForMatches,
}) => {
  return isForMatches ? (
    <View style={styles.votedBadge}>
      <Text style={styles.votedBadgeTitle}>Voted</Text>
    </View>
  ) : (
    <View
      style={[
        styles.votedBadge,
        {
          borderColor:
            isWin === null
              ? CRICKET_GREEN_COLOR
              : isWin
                ? GOLD_COLOR
                : ERROR_RED_COLOR,
          left: 16,
        },
      ]}
    >
      <Text style={styles.votedBadgeTitle}>
        {isWin === null ? 'Активная' : isWin ? 'Победа' : 'Поражение'}
      </Text>
    </View>
  );
};

export default VoteStatusBadge;

const styles = StyleSheet.create({
  votedBadge: {
    position: 'absolute',
    left: 8,
    top: 12,
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
