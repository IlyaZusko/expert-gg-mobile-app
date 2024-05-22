import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DefaultButton } from '@/components';
import { useSession } from '@/context/ctx';
import {
  ACCENT_BLUE_COLOR,
  BLACK_COLOR,
  GREY_TEXT_COLOR,
  WHITE_COLOR,
} from '@/helpers/constants/Colors';
import { useAppSelector } from '@/helpers/hooks';

const Profile = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'profile',
  });
  const { signOut } = useSession();
  const { userProfile } = useAppSelector((state) => state.userSlice);

  const userAvatar =
    userProfile && userProfile.avatar_url && userProfile.avatar_url.length > 0
      ? { uri: userProfile.avatar_url }
      : require('assets/images/default-avatar.svg');

  return (
    <View style={styles.wrapper}>
      <View style={styles.contentContainer}>
        <Image
          source={userAvatar}
          style={{ width: 100, height: 100, borderRadius: 10000 }}
          contentFit="contain"
        />
        <Text style={styles.usernameTitle}>{userProfile?.username}</Text>
        <Text style={styles.emailTitle}>{userProfile?.email}</Text>
        <View style={styles.buttonsContainer}>
          <DefaultButton
            label={t('getCoinsButton')}
            onClick={() => router.push('/(tabs)/(profile)/reward')}
            isPrimary
            icon={require('assets/icons/gg-coins.svg')}
          />
          <DefaultButton
            label={t('editProfileButton')}
            onClick={() => router.push('/(tabs)/(profile)/edit-profile')}
            icon={require('assets/icons/edit-pencil-icon.svg')}
          />
          <DefaultButton
            label={t('supportButton')}
            onClick={() => router.push('/(tabs)/(profile)/call-request')}
            icon={require('assets/icons/call-request-icon.svg')}
          />
          <DefaultButton
            label={t('settingsButton')}
            onClick={() => router.push('/(tabs)/(profile)/settings')}
            icon={require('assets/icons/settings-icon.svg')}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.outlineButton} onPress={() => signOut()}>
        <Text style={styles.outlineButtonTitle}>{t('logOutButton')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: BLACK_COLOR,
    paddingTop: 16,
    paddingHorizontal: 46,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 32,
  },
  contentContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
  },
  usernameTitle: {
    fontFamily: 'Mont_600',
    fontSize: 17,
    color: WHITE_COLOR,
    marginTop: 7,
  },
  emailTitle: {
    fontFamily: 'Mont_600',
    fontSize: 14,
    color: GREY_TEXT_COLOR,
    marginBottom: 11,
  },
  buttonsContainer: {
    width: '100%',
    gap: 16,
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
