import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import FAQInfoBlock from '@/components/FAQInfoBlock';
import {
  BLACK_COLOR,
  COVER_COLOR,
  GREY_TEXT_COLOR,
} from '@/helpers/constants/Colors';

const FAQ = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'profile.info',
  });
  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.scrollViewContentWrapper}>
        <Text style={styles.tipTitle}>{t('tipTitle')}</Text>
        <FAQInfoBlock
          title="playScreenInfo.title"
          subTitle="playScreenInfo.subTitle"
          icon={require('assets/icons/tab-swords-active.svg')}
        />
        <View style={styles.separator} />
        <FAQInfoBlock
          title="votesScreenInfo.title"
          subTitle="votesScreenInfo.subTitle"
          icon={require('assets/icons/tab-votes-active.svg')}
        />
        <View style={styles.separator} />
        <FAQInfoBlock
          title="leaderboardScreenInfo.title"
          subTitle="leaderboardScreenInfo.subTitle"
          icon={require('assets/icons/tab-trophy-active.svg')}
        />
        <View style={styles.separator} />
        <FAQInfoBlock
          title="profileScreenInfo.title"
          subTitle="profileScreenInfo.subTitle"
          icon={require('assets/icons/tab-user-active.svg')}
        />
      </ScrollView>
    </View>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: BLACK_COLOR,
    gap: 12,
  },
  tipTitle: {
    fontFamily: 'Mont_400',
    fontSize: 14,
    color: GREY_TEXT_COLOR,
    paddingBottom: 16,
  },
  scrollViewContentWrapper: {
    paddingHorizontal: 16,
    paddingTop: 10,
    gap: 16,
    paddingBottom: 30,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: COVER_COLOR,
  },
});
