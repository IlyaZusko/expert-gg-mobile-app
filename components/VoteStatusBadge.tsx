import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('translation', {
    keyPrefix: 'myVotes',
  });
  return isForMatches ? (
    <View style={styles.votedBadge}>
      <Text style={styles.votedBadgeTitle}>{t('voted')}</Text>
    </View>
  ) : (
    <View
      style={[
        styles.votedBadge,
        {
          borderColor:
            isWin === null
              ? CRICKET_GREEN_COLOR
              : isWin === true
                ? GOLD_COLOR
                : ERROR_RED_COLOR,
          left: 16,
        },
      ]}
    >
      <Text style={styles.votedBadgeTitle}>
        {isWin === null ? t('active') : isWin === true ? t('win') : t('lose')}
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
    paddingHorizontal: 6,
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
