import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SignUpValidationSchema } from './utils';

import { DefaultButton, OutlinedInput } from '@/components';
import { useSession } from '@/context/ctx';
import { auth, db } from '@/firebaseConfig';
import {
  GREY_TEXT_COLOR,
  LINEAR_END_COLOR,
  LINEAR_START_COLOR,
  WHITE_COLOR,
} from '@/helpers/constants/Colors';

interface SignUpValues {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const initialValues = {
  username: 'IlyaZusko',
  email: 'ilyazusko.dev@gmail.com',
  password: 'Gjgeufq1',
  passwordConfirm: 'Gjgeufq1',
  // username: '',
  // email: '',
  // password: '',
  // passwordConfirm: '',
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
  const { signIn } = useSession();

  const formik = useFormik<SignUpValues>({
    initialValues,
    validationSchema: SignUpValidationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values) => {
      const { username, email, passwordConfirm } = values;
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        passwordConfirm,
      );

      const userid = user.user.uid;
      await setDoc(doc(db, 'users', userid), {
        username,
        email,
        ad_view_date: '',
        avatar_url: '',
        coins: 100,
        count_wins: 0,
        total_earn: 0,
      });
      signIn(email, passwordConfirm);
    },
  });

  const { values, submitForm, setFieldValue, errors } = formik;

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
              onChange={(v) => setFieldValue('username', v)}
              error={errors.username}
            />
            <OutlinedInput
              placeholder={tInput('emailPlaceholder')}
              inputType="email"
              value={values.email}
              onChange={(v) => setFieldValue('email', v)}
              error={errors.email}
            />
            <OutlinedInput
              placeholder={tInput('passwordPlaceholder')}
              inputType="text"
              isSecureText
              value={values.password}
              onChange={(v) => setFieldValue('password', v)}
              error={errors.password}
            />
            <OutlinedInput
              placeholder={tInput('passwordRepeatPlaceholder')}
              inputType="text"
              isSecureText
              value={values.passwordConfirm}
              onChange={(v) => setFieldValue('passwordConfirm', v)}
              error={errors.passwordConfirm}
            />
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
});
