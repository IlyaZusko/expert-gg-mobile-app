import { Image } from 'expo-image';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COVER_COLOR, WHITE_COLOR } from '@/helpers/constants/Colors';

interface ISettingsButton {
  onClick: () => void;
  label: string;
  isLeftTitle?: boolean;
}

const SettingsButton: React.FC<ISettingsButton> = ({
  label,
  onClick,
  isLeftTitle,
}) => {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'profile.settings',
  });
  return (
    <TouchableOpacity style={styles.button} onPress={onClick}>
      <Text style={styles.buttonTitle}>{t(label)}</Text>
      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        {isLeftTitle && (
          <Text style={styles.labelTitle}>{t(i18n.language)}</Text>
        )}
        <Image
          source={require('assets/icons/arrow-left-button.svg')}
          style={{ width: 9, height: 16 }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SettingsButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 13,
    backgroundColor: COVER_COLOR,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
  },
  labelTitle: {
    fontFamily: 'Mont_400',
    fontSize: 14,
    color: WHITE_COLOR,
  },
  buttonTitle: {
    fontFamily: 'Mont_600',
    fontSize: 16,
    color: WHITE_COLOR,
  },
});
