import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { DefaultButton } from '@/components';
import { useSession } from '@/context/ctx';
import {
  ACCENT_BLUE_COLOR,
  BLACK_COLOR,
  ERROR_RED_COLOR,
  GREY_TEXT_COLOR,
  WHITE_COLOR,
} from '@/helpers/constants/Colors';
import { useAppSelector } from '@/helpers/hooks';

const Profile = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'profile',
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);

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
            icon={require('assets/icons/support.svg')}
          />
          <DefaultButton
            label={t('settingsButton')}
            onClick={() => router.push('/(tabs)/(profile)/settings')}
            icon={require('assets/icons/settings-icon.svg')}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.outlineButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.outlineButtonTitle}>{t('logOutButton')}</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          style={styles.centeredView}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalMainTitle}>{t('modalMainTitle')}</Text>
            <Text style={styles.modalSubTitle}>{t('modalSubTitle')}</Text>
            <View style={styles.modalOkButtonWrapper}>
              <TouchableOpacity
                style={[styles.modalOkButton, styles.modalCancelButton]}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOkButtonTitle,
                    { fontFamily: 'Mont_400' },
                  ]}
                >
                  {t('modalCancelButton')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOkButton}
                onPress={() => {
                  setModalVisible(false);
                  signOut();
                }}
              >
                <Text style={styles.modalOkButtonTitle}>
                  {t('modalOkButton')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
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
  centeredView: {
    flex: 1,
    width: '100%',
    backgroundColor: '#00000060',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: BLACK_COLOR,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  modalMainTitle: {
    fontFamily: 'Mont_600',
    color: WHITE_COLOR,
    fontSize: 14,
  },
  modalSubTitle: {
    fontFamily: 'Mont_400',
    fontSize: 12,
    color: GREY_TEXT_COLOR,
  },
  modalOkButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalOkButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: ERROR_RED_COLOR,
    borderRadius: 4,
    marginTop: 8,
  },
  modalCancelButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: ACCENT_BLUE_COLOR,
    borderRadius: 4,
    marginTop: 8,
    backgroundColor: 'transparent',
  },
  modalOkButtonTitle: {
    fontFamily: 'Mont_600',
    color: WHITE_COLOR,
  },
});
