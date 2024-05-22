import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { SettingsButton } from '@/components';
import { BLACK_COLOR } from '@/helpers/constants/Colors';

const Settings = () => {
  return (
    <View style={styles.wrapper}>
      <SettingsButton
        label="changeLanguage"
        onClick={() => router.push('/(tabs)/(profile)/settings/language')}
        isLeftTitle
      />
      <SettingsButton
        label="changePassword"
        onClick={() =>
          router.push('/(tabs)/(profile)/settings/password-change')
        }
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: BLACK_COLOR,
    paddingHorizontal: 16,
    paddingTop: 26,
    gap: 8,
  },
});
