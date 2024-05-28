import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

import { EditProfileValidationSchema } from './utils';

import { DefaultButton, OutlinedInput } from '@/components';
import { useSession } from '@/context/ctx';
import { db, storage } from '@/firebaseConfig';
import {
  ACCENT_BLUE_COLOR,
  BLACK_COLOR,
  WHITE_COLOR,
} from '@/helpers/constants/Colors';
import { useAppSelector } from '@/helpers/hooks';
import { setUserProfile } from '@/store/service/userSlice';

interface EditProfileValues {
  username: string;
}

const EditProfile = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'profile.editProfile',
  });
  const { t: tInput } = useTranslation('translation', {
    keyPrefix: 'input',
  });
  const { session } = useSession();
  const dispatch = useDispatch();
  const { userProfile } = useAppSelector((state) => state.userSlice);
  const [image, setImage] = useState<string | null>(null);

  const initialValues = {
    username: userProfile?.username || '',
  };

  const formik = useFormik<EditProfileValues>({
    initialValues,
    validationSchema: EditProfileValidationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const { username } = values;
        if (session) {
          await updateDoc(doc(db, 'users', session), {
            username,
          });
          router.back();
          Toast.show({
            type: 'success',
            text1: t('alertMainTitle'),
            text2: t('alertSubTitle'),
          });
        }
      } catch (e) {
        console.log('error', e);
      }
    },
  });

  const handleDeleteProfilePicture = async () => {
    dispatch(setUserProfile({ ...userProfile, avatar_url: '' }));
    if (session) {
      await updateDoc(doc(db, 'users', session), {
        avatar_url: '',
      });
    }
  };

  const uploadImage = async (image: string) => {
    if (image && session) {
      const blob: Blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', image, true);
        xhr.send(null);
      });
      const avatarRef = ref(storage, `${session}-avatar`);
      uploadBytes(avatarRef, blob).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, 'users', session), {
            avatar_url: downloadURL,
          });
        });
      });
    }
  };

  const handleUploadProfilePicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    }
  };

  const { values, submitForm, setFieldValue, errors } = formik;

  const userAvatar = image
    ? image
    : userProfile && userProfile.avatar_url && userProfile.avatar_url.length > 0
      ? { uri: userProfile.avatar_url }
      : require('assets/images/default-avatar.svg');
  return (
    <View style={styles.wrapper}>
      <View style={styles.avatarContainer}>
        <Image
          source={userAvatar}
          style={{ width: 136, height: 136, borderRadius: 100000 }}
        />
        <View style={styles.avatarButtonsContainer}>
          <TouchableOpacity
            style={styles.avatarButton}
            onPress={() => handleUploadProfilePicture()}
          >
            <Text style={styles.avatarButtonTitle}>
              {t('updateProfilePictire')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.avatarButton}
            onPress={() => handleDeleteProfilePicture()}
          >
            <Text style={styles.avatarButtonTitle}>
              {t('deleteProfilePicture')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.formContainer}>
        <OutlinedInput
          inputType="text"
          placeholder={tInput('usernamePlaceholder')}
          value={values.username}
          onChange={(v) => setFieldValue('username', v)}
          error={errors.username}
        />
        <DefaultButton label={t('save')} onClick={() => submitForm()} />
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: BLACK_COLOR,
    paddingHorizontal: 46,
    paddingTop: 36,
  },
  avatarContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatarButtonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 12,
  },
  avatarButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: ACCENT_BLUE_COLOR,
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 4,
  },
  avatarButtonTitle: {
    fontFamily: 'Mont_400',
    fontSize: 12,
    color: WHITE_COLOR,
  },
  formContainer: {
    paddingTop: 24,
    flexDirection: 'column',
    gap: 16,
  },
});
