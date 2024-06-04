import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
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

import { SignUpValidationSchema } from './utils';

import { DefaultButton, OutlinedInput } from '@/components';
import { auth, db } from '@/firebaseConfig';
import {
  ACCENT_BLUE_COLOR,
  BLACK_COLOR,
  ERROR_RED_COLOR,
  GREY_TEXT_COLOR,
  LINEAR_END_COLOR,
  LINEAR_START_COLOR,
  WHITE_COLOR,
} from '@/helpers/constants/Colors';
import { Status } from '@/helpers/constants/Common';
import { IFirebaseError } from '@/store/models/Firebase';

interface SignUpValues {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const initialValues = {
  // username: 'IlyaZusko',
  // email: 'ilyazusko.dev@gmail.com',
  // password: 'Gjgeufq1',
  // passwordConfirm: 'Gjgeufq1',
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const SignUp = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'auth.signUp',
  });
  const { t: tButtons } = useTranslation('translation', {
    keyPrefix: 'buttons',
  });
  const { t: tInput } = useTranslation('translation', {
    keyPrefix: 'input',
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const formik = useFormik<SignUpValues>({
    initialValues,
    validationSchema: SignUpValidationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values) => {
      const { username, email, passwordConfirm } = values;
      try {
        setModalVisible(true);
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          passwordConfirm,
        );
        if (auth.currentUser) {
          sendEmailVerification(auth.currentUser, {
            handleCodeInApp: true,
            url: 'https://expert-gg-mobile-app.firebaseapp.com',
          });
        }
        const userid = user.user.uid;
        await setDoc(doc(db, 'users', userid), {
          username,
          email,
          ad_view_date: '',
          add_watch_count: 0,
          avatar_url: '',
          coins: 100,
          count_wins: 0,
          total_earn: 0,
          status: Status.Active,
        });
        await updateDoc(doc(db, 'users', userid), {
          user_id: userid,
        });
      } catch (err) {
        const error = err as IFirebaseError;
        setAuthError(error.code);
      }
    },
  });

  const { values, submitForm, setFieldValue, errors } = formik;

  const handleInputChange = (field: string, value: string) => {
    setFieldValue(field, value);
    setAuthError(null);
  };

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={[LINEAR_START_COLOR, LINEAR_END_COLOR]}
        style={styles.linearContainer}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <Image
          style={{ width: 223, height: 96 }}
          source={require('assets/icons/main-logo.svg')}
        />
        <View style={styles.contentContainer}>
          <View style={styles.formContainer}>
            <OutlinedInput
              placeholder={tInput('usernamePlaceholder')}
              inputType="text"
              value={values.username}
              onChange={(v) => handleInputChange('username', v)}
              error={errors.username}
            />
            <OutlinedInput
              placeholder={tInput('emailPlaceholder')}
              inputType="email"
              value={values.email}
              onChange={(v) => handleInputChange('email', v)}
              error={errors.email}
            />
            <OutlinedInput
              placeholder={tInput('passwordPlaceholder')}
              inputType="text"
              isSecureText
              value={values.password}
              onChange={(v) => handleInputChange('password', v)}
              error={errors.password}
            />
            <OutlinedInput
              placeholder={tInput('passwordRepeatPlaceholder')}
              inputType="text"
              isSecureText
              value={values.passwordConfirm}
              onChange={(v) => handleInputChange('passwordConfirm', v)}
              error={errors.passwordConfirm}
            />
            {authError && <Text style={styles.errorTitle}>{t(authError)}</Text>}
            <DefaultButton
              label={tButtons('signUp')}
              onClick={() => submitForm()}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: 100,
            }}
          >
            <Text style={styles.termsTitle}>{t('isAccount')} </Text>
            <TouchableOpacity>
              <Text
                style={[
                  styles.termsTitle,
                  { color: WHITE_COLOR, textDecorationLine: 'underline' },
                ]}
                onPress={() => router.push('/login')}
              >
                {tButtons('signIn')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
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
                style={styles.modalOkButton}
                onPress={() => {
                  setModalVisible(false);
                  router.push('/login');
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

export default SignUp;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  linearContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 31,
    paddingBottom: 16,
    gap: 60,
  },
  contentContainer: {
    width: '100%',
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  socialSignInTip: {
    fontFamily: 'Mont_500',
    fontSize: 12,
    color: GREY_TEXT_COLOR,
    textAlign: 'center',
    paddingTop: 24,
    paddingBottom: 38,
  },
  socialButtonsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 100,
  },
  termsTitle: {
    fontFamily: 'Mont_500',
    fontSize: 12,
    color: '#D6D6D6',
  },
  errorTitle: {
    fontFamily: 'Mont_500',
    fontSize: 12,
    color: ERROR_RED_COLOR,
    paddingHorizontal: 20,
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
  },
  modalOkButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: ACCENT_BLUE_COLOR,
    borderRadius: 4,
    marginTop: 8,
  },
  modalOkButtonTitle: {
    fontFamily: 'Mont_600',
    color: WHITE_COLOR,
  },
});
