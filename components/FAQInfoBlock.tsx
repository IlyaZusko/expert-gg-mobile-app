import { Image, ImageSource } from 'expo-image';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';

import { GREY_TEXT_COLOR, WHITE_COLOR } from '@/helpers/constants/Colors';

interface IFAQInfoBlock {
  title: string;
  subTitle: string;
  icon:
    | string
    | number
    | string[]
    | ImageSource
    | ImageSource[]
    | null
    | undefined;
}

const FAQInfoBlock: React.FC<IFAQInfoBlock> = ({ title, subTitle, icon }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'profile.info',
  });
  return (
    <View style={styles.infoBlockWrapper}>
      <View style={styles.mainTitleWrapper}>
        <Image style={{ width: 18, height: 18 }} source={icon} />
        <Text style={styles.mainTitle}>{t(title)}</Text>
      </View>
      <Text style={styles.descriptionTitle}>{t(subTitle)}</Text>
    </View>
  );
};

export default FAQInfoBlock;

const styles = StyleSheet.create({
  infoBlockWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  mainTitleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mainTitle: {
    fontFamily: 'Mont_600',
    color: WHITE_COLOR,
    fontSize: 24,
  },
  descriptionTitle: {
    fontFamily: 'Mont_400',
    color: GREY_TEXT_COLOR,
    fontSize: 13,
  },
});
