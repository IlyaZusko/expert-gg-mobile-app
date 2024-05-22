import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DefaultButton } from '@/components';
import {
  LINEAR_START_COLOR,
  LINEAR_END_COLOR,
  ACCENT_BLUE_COLOR,
  WHITE_COLOR,
} from '@/helpers/constants/Colors';

const Welcome = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'auth',
  });
  const { t: tButtons } = useTranslation('translation', {
    keyPrefix: 'buttons',
  });
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={[LINEAR_START_COLOR, LINEAR_END_COLOR]}
        style={styles.linearContainer}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <Image
          source={require('assets/icons/main-logo.svg')}
          style={{ width: 140, height: 61 }}
        />
        <View style={{ paddingBottom: 40 }}>
          <Text style={styles.mainTitle}>{t('welcomeTitleOne')}</Text>
          <Text style={styles.mainTitle}>{t('welcomeTitleTwo')}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <DefaultButton
            label={tButtons('signIn')}
            onClick={() => router.push('/(auth)/login')}
          />
          <TouchableOpacity
            style={styles.outlineButton}
            onPress={() => router.push('/(auth)/sign-up')}
          >
            <Text style={styles.outlineButtonTitle}>{tButtons('signUp')}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  linearContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 31,
    paddingTop: 60,
    paddingBottom: 60,
    // gap: 60,
  },
  mainTitle: {
    fontFamily: 'Mont_700',
    color: WHITE_COLOR,
    fontSize: 30,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 30,
  },
  outlineButton: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: ACCENT_BLUE_COLOR,
    borderRadius: 10000,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineButtonTitle: {
    fontFamily: 'Mont_600',
    color: WHITE_COLOR,
  },
});
