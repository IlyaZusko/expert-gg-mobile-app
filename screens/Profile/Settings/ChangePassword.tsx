import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text } from 'react-native';
import Toast from 'react-native-toast-message';

import { PasswordChangeValidationSchema } from './utils';

import { DefaultButton, OutlinedInput } from '@/components';
import { auth } from '@/firebaseConfig';
import {
  BLACK_COLOR,
  ERROR_RED_COLOR,
  GREY_TEXT_COLOR,
} from '@/helpers/constants/Colors';
import { IFirebaseError } from '@/store/models/Firebase';

interface SignUpValues {
  oldPassword: string;
  password: string;
  passwordConfirm: string;
}

const initialValues = {
  // oldPassword: 'Gjgeufq1',
  // password: 'Gjgeufq2',
  // passwordConfirm: 'Gjgeufq2',
  oldPassword: '',
  password: '',
  passwordConfirm: '',
};

const ChangePassword = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'profile.settings',
  });
  const { t: tButtons } = useTranslation('translation', {
    keyPrefix: 'buttons',
  });
  const { t: tInput } = useTranslation('translation', {
    keyPrefix: 'input',
  });

  const [authError, setAuthError] = useState<string | null>(null);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  const formik = useFormik<SignUpValues>({
    initialValues,
    validationSchema: PasswordChangeValidationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values) => {
      const { oldPassword, passwordConfirm } = values;
      try {
        setIsButtonLoading(true);
        const user = auth.currentUser;
        if (user && user.email) {
          const cred = EmailAuthProvider.credential(user.email, oldPassword);
          reauthenticateWithCredential(user, cred)
            .then(async () => {
              await updatePassword(user, passwordConfirm);
              setIsButtonLoading(false);
              Toast.show({
                type: 'success',
                text1: t('alertMainTitlePasswordChange'),
                text2: t('alertSubTitlePasswordChange'),
              });
            })
            .catch((error) => {
              setIsButtonLoading(false);
              const err = error as IFirebaseError;
              setAuthError(err.code);
            });
        }
      } catch (err) {
        setIsButtonLoading(false);
        console.log(err);
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
      <View style={styles.contentContainer}>
        <View style={styles.formContainer}>
          <OutlinedInput
            placeholder={tInput('passwordPlaceholder')}
            inputType="text"
            isSecureText
            value={values.oldPassword}
            onChange={(v) => handleInputChange('oldPassword', v)}
            error={errors.oldPassword}
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
            label={tButtons('confirm')}
            onClick={() => submitForm()}
            isLoading={isButtonLoading}
          />
        </View>
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: BLACK_COLOR,
    paddingHorizontal: 16,
    paddingTop: 26,
    gap: 12,
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
