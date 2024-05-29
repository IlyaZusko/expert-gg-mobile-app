import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { LogInValidationSchema } from './utils';

import { DefaultButton, OutlinedInput } from '@/components';
import { useSession } from '@/context/ctx';
import {
  ERROR_RED_COLOR,
  GREY_TEXT_COLOR,
  LINEAR_END_COLOR,
  LINEAR_START_COLOR,
  WHITE_COLOR,
} from '@/helpers/constants/Colors';
import { useAppSelector } from '@/helpers/hooks';
import { setIsAuthError } from '@/store/service/userSlice';

interface LogInValues {
  email: string;
  password: string;
}

const initialValues = {
  email: 'ilyazusko.dev@gmail.com',
  password: 'Gjgeufq1',
  // email: '',
  // password: '',
};

const Login = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'auth.login',
  });
  const { t: tButtons } = useTranslation('translation', {
    keyPrefix: 'buttons',
  });
  const { t: tInput } = useTranslation('translation', {
    keyPrefix: 'input',
  });
  const { signIn } = useSession();
  const { isAuthError, isBlockedError, isNotVerifyError } = useAppSelector(
    (state) => state.userSlice,
  );

  const dispatch = useDispatch();

  const formik = useFormik<LogInValues>({
    initialValues,
    validationSchema: LogInValidationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values) => {
      const { email, password } = values;
      signIn(email, password);
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
              placeholder={tInput('emailPlaceholder')}
              inputType="email"
              value={values.email}
              onChange={(v) => {
                dispatch(setIsAuthError(false));
                setFieldValue('email', v);
              }}
              error={errors.email}
            />
            <OutlinedInput
              placeholder={tInput('passwordPlaceholder')}
              inputType="text"
              isSecureText
              value={values.password}
              onChange={(v) => {
                dispatch(setIsAuthError(false));
                setFieldValue('password', v);
              }}
              error={errors.password}
            />
            {isAuthError && (
              <Text style={styles.errorTitle}>{t('signInError')}</Text>
            )}
            {isBlockedError && (
              <Text style={styles.errorTitle}>{t('isBlockedError')}</Text>
            )}
            {isNotVerifyError && (
              <Text style={styles.errorTitle}>{t('isNotVerifyError')}</Text>
            )}
            <DefaultButton
              label={tButtons('signIn')}
              onClick={() => submitForm()}
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
                  onPress={() => router.push('/password-reset')}
                >
                  {tButtons('resetPassword')}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.termsTitle}>{t('noAccount')} </Text>
              <TouchableOpacity>
                <Text
                  style={[
                    styles.termsTitle,
                    { color: WHITE_COLOR, textDecorationLine: 'underline' },
                  ]}
                  onPress={() => router.push('/sign-up')}
                >
                  {tButtons('signUp')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: 130,
            }}
          >
            <Text style={styles.termsTitle}>{t('supportTip')} </Text>
            <TouchableOpacity>
              <Text
                style={[
                  styles.termsTitle,
                  { color: WHITE_COLOR, textDecorationLine: 'underline' },
                ]}
                onPress={() => router.push('/call-request')}
              >
                {t('supportLink')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Login;

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
});
