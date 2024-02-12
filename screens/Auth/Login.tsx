import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useFormik } from 'formik';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { LogInValidationSchema } from './utils';

import { DefaultButton, OutlinedInput, SocialLoginButton } from '@/components';
import {
  LINEAR_END_COLOR,
  LINEAR_START_COLOR,
  WHITE_COLOR,
} from '@/constants/Colors';
import { useSession } from '@/context/ctx';

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
  const { signIn } = useSession();

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
              placeholder="Электронная почта..."
              inputType="email"
              value={values.email}
              onChange={(v) => setFieldValue('email', v)}
              error={errors.email}
            />
            <OutlinedInput
              placeholder="Пароль..."
              inputType="text"
              isSecureText
              value={values.password}
              onChange={(v) => setFieldValue('password', v)}
              error={errors.password}
            />
            <DefaultButton label="Войти" onClick={() => submitForm()} />
          </View>
          <Text style={styles.socialSignInTip}>
            Или войдите с помощью социальных сетей
          </Text>
          <View style={styles.socialButtonsContainer}>
            <SocialLoginButton label="Google" />
            <SocialLoginButton label="Facebook" />
            <SocialLoginButton label="Apple" />
            <SocialLoginButton label="Twitter" />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={styles.termsTitle}>Еще нет аккаунта? </Text>
            <TouchableOpacity>
              <Text
                style={[
                  styles.termsTitle,
                  { color: WHITE_COLOR, textDecorationLine: 'underline' },
                ]}
              >
                Зарегистрироваться
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
    color: '#959595',
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
