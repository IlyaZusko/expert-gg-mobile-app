import { updatePassword } from 'firebase/auth';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { DefaultButton, OutlinedInput } from '@/components';
import { auth } from '@/firebaseConfig';
import { BLACK_COLOR, GREY_TEXT_COLOR } from '@/helpers/constants/Colors';

interface SignUpValues {
  oldPassword: string;
  password: string;
  passwordConfirm: string;
}

const initialValues = {
  oldPassword: 'Kjgeijr1',
  password: 'Gjgeufq1',
  passwordConfirm: 'Gjgeufq1',
  // username: '',
  // email: '',
  // password: '',
  // passwordConfirm: '',
};

const ChangePassword = () => {
  const { t: tButtons } = useTranslation('translation', {
    keyPrefix: 'buttons',
  });
  const { t: tInput } = useTranslation('translation', {
    keyPrefix: 'input',
  });

  const formik = useFormik<SignUpValues>({
    initialValues,
    // validationSchema: SignUpValidationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        if (auth.currentUser) {
          const user = auth.currentUser;
          console.log(user);
          await updatePassword(user, values.passwordConfirm);
        }
      } catch (err) {
        console.log(err);
      }
      // const { username, email, passwordConfirm } = values;
      // const user = await createUserWithEmailAndPassword(
      //   auth,
      //   email,
      //   passwordConfirm,
      // );
      // const userid = user.user.uid;
      // await setDoc(doc(db, 'users', userid), {
      //   username,
      //   email,
      //   ad_view_date: '',
      //   avatar_url: '',
      //   coins: 100,
      //   count_wins: 0,
      //   total_earn: 0,
      // });
      // signIn(email, passwordConfirm);
    },
  });

  const { values, submitForm, setFieldValue, errors } = formik;

  return (
    <View style={styles.wrapper}>
      <View style={styles.contentContainer}>
        <View style={styles.formContainer}>
          <OutlinedInput
            placeholder={tInput('passwordPlaceholder')}
            inputType="text"
            // isSecureText
            value={values.oldPassword}
            onChange={(v) => setFieldValue('oldPassword', v)}
            error={errors.oldPassword}
          />
          <OutlinedInput
            placeholder={tInput('passwordPlaceholder')}
            inputType="text"
            // isSecureText
            value={values.password}
            onChange={(v) => setFieldValue('password', v)}
            error={errors.password}
          />
          <OutlinedInput
            placeholder={tInput('passwordRepeatPlaceholder')}
            inputType="text"
            // isSecureText
            value={values.passwordConfirm}
            onChange={(v) => setFieldValue('passwordConfirm', v)}
            error={errors.passwordConfirm}
          />
          <DefaultButton
            label={tButtons('confirm')}
            onClick={() => submitForm()}
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
});
