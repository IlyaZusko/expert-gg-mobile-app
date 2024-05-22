import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-radio-buttons-group';

import {
  ACCENT_BLUE_COLOR,
  BLACK_COLOR,
  COVER_COLOR,
  GREY_TEXT_COLOR,
  WHITE_COLOR,
} from '@/helpers/constants/Colors';

const Language = () => {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'profile.settings',
  });
  const [selectedId, setSelectedId] = useState<string>(
    i18n.language === 'ru' ? '0' : '1',
  );

  const handleSelectLanguage = (id: string, targetLanguage: string) => {
    i18n.changeLanguage(targetLanguage);
    setSelectedId(id);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.tipTitle}>{t('changeTip')}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelectLanguage('0', 'ru')}
      >
        <Text style={styles.buttonTitle}>{t('ru')}</Text>
        <RadioButton
          id="0"
          selected={selectedId === '0'}
          borderColor={selectedId === '0' ? ACCENT_BLUE_COLOR : COVER_COLOR}
          color={ACCENT_BLUE_COLOR}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelectLanguage('1', 'en')}
      >
        <Text style={styles.buttonTitle}>{t('en')}</Text>
        <RadioButton
          id="1"
          selected={selectedId === '1'}
          borderColor={selectedId === '1' ? ACCENT_BLUE_COLOR : COVER_COLOR}
          color={ACCENT_BLUE_COLOR}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Language;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: BLACK_COLOR,
    paddingHorizontal: 16,
    paddingTop: 26,
    gap: 12,
  },
  button: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBlockColor: COVER_COLOR,
    alignItems: 'center',
    paddingLeft: 16,
    paddingBottom: 4,
  },
  buttonTitle: {
    fontFamily: 'Mont_500',
    fontSize: 14,
    color: WHITE_COLOR,
  },
  tipTitle: {
    fontFamily: 'Mont_400',
    fontSize: 14,
    color: GREY_TEXT_COLOR,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
});
