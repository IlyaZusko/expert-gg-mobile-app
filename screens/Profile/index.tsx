import { Image } from 'expo-image';
import { DocumentData, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DefaultButton } from '@/components';
import { useSession } from '@/context/ctx';
import { db } from '@/firebaseConfig';
import {
  ACCENT_BLUE_COLOR,
  BLACK_COLOR,
  GREY_TEXT_COLOR,
  WHITE_COLOR,
} from '@/helpers/constants/Colors';

const Profile = () => {
  const { session, signOut } = useSession();
  const [userData, setUserData] = useState<DocumentData | null>(null);

  const handleGetUser = async (userId: string) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setUserData(data);
    }
  };

  useEffect(() => {
    if (session) {
      handleGetUser(session);
    }
  }, []);

  const userAvatar =
    userData && userData?.avatar_url && userData?.avatar_url.length > 0
      ? { uri: userData.avatar_url }
      : require('assets/images/default-avatar.svg');

  return (
    <View style={styles.wrapper}>
      <View style={styles.contentContainer}>
        <Image
          source={userAvatar}
          style={{ width: 64, height: 64, borderRadius: 10000 }}
          contentFit="contain"
        />
        <Text style={styles.usernameTitle}>{userData?.username}</Text>
        <Text style={styles.emailTitle}>{userData?.email}</Text>
        <View style={styles.buttonsContainer}>
          <DefaultButton
            label="Получить GG coins"
            onClick={() => {}}
            isPrimary
            icon={require('assets/icons/gg-coins.svg')}
          />
          <DefaultButton
            label="Редактировать профиль"
            onClick={() => {}}
            icon={require('assets/icons/edit-pencil-icon.svg')}
          />
          <DefaultButton
            label="Настройки"
            onClick={() => {}}
            icon={require('assets/icons/settings-icon.svg')}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.outlineButton} onPress={() => signOut()}>
        <Text style={styles.outlineButtonTitle}>Выйти</Text>
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
