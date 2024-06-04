import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { collection, getDocs, query } from 'firebase/firestore';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

import { PasswordRecoveryValidationSchema } from './utils';

import { DefaultButton, OutlinedInput } from '@/components';
import { auth, db } from '@/firebaseConfig';
import {
  ERROR_RED_COLOR,
  LINEAR_END_COLOR,
  LINEAR_START_COLOR,
  WHITE_COLOR,
} from '@/helpers/constants/Colors';
import { IProfile } from '@/store/models/Profile';

interface PasswordRecoveryvalues {
  email: string;
}

const initialValues = {
  email: '',
};

const PasswordReset = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'auth.passwordRecovery',
  });
  const { t: tButtons } = useTranslation('translation', {
    keyPrefix: 'buttons',
  });
  const { t: tInput } = useTranslation('translation', {
    keyPrefix: 'input',
  });

  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [noEmailError, setNoEmailError] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);

  const formik = useFormik<PasswordRecoveryvalues>({
    initialValues,
    validationSchema: PasswordRecoveryValidationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values) => {
      const { email } = values;
      setIsButtonLoading(true);
      try {
        const q = query(collection(db, 'users'));
        getDocs(q).then((res) => {
          const newListUsers: IProfile[] = [];
          res.forEach((doc) => {
            newListUsers.push(doc.data() as IProfile);
          });
          if (newListUsers.some((user) => user.email === email)) {
            sendPasswordResetEmail(auth, email, {
              handleCodeInApp: true,
              url: 'https://expert-gg-mobile-app.firebaseapp.com',
            })
              .then(() => {
                setIsSent(true);
                setIsButtonLoading(false);
                Toast.show({
                  type: 'success',
                  text1: t('alertMainTitle'),
                  text2: t('alertSubTitle'),
                });
              })
              .catch((error) => {
                setIsButtonLoading(false);
                console.log(error);
              });
          } else {
            setIsButtonLoading(false);
            setNoEmailError(true);
          }
        });
      } catch (err) {
        setIsButtonLoading(false);
        console.log(err);
      }
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
        <Text style={styles.mainTitle}>{t('mainTitle')}</Text>
        <View style={styles.contentContainer}>
          <View style={styles.formContainer}>
            <OutlinedInput
              placeholder={tInput('emailPlaceholder')}
              inputType="email"
              value={values.email}
              onChange={(v) => {
                setFieldValue('email', v);
                setNoEmailError(false);
              }}
              error={errors.email}
            />
            {noEmailError && (
              <Text style={styles.errorTitle}>{t('noEmailError')}</Text>
            )}
            <DefaultButton
              label={tButtons('reset')}
              onClick={() => submitForm()}
              isLoading={isButtonLoading}
              isDisabled={isSent}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingBottom: 10,
              }}
            >
              <TouchableOpacity>
                <Text
                  style={[
                    styles.termsTitle,
                    { color: WHITE_COLOR, textDecorationLine: 'underline' },
                  ]}
                  onPress={() => router.back()}
                >
                  {t('back')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default PasswordReset;

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
    gap: 30,
  },
  mainTitle: {
    fontFamily: 'Mont_600',
    color: WHITE_COLOR,
    fontSize: 22,
    paddingBottom: 30,
  },
  contentContainer: {
    width: '100%',
    paddingBottom: 190,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  errorTitle: {
    fontFamily: 'Mont_500',
    fontSize: 12,
    color: ERROR_RED_COLOR,
    paddingHorizontal: 20,
  },
  termsTitle: {
    fontFamily: 'Mont_500',
    fontSize: 12,
    color: '#D6D6D6',
  },
});
