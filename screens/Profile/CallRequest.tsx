import dayjs from 'dayjs';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { CallRequestValidationSchema } from './utils';

import { DefaultButton, OutlinedInput, PhoneNumberInput } from '@/components';
import { useSession } from '@/context/ctx';
import { db } from '@/firebaseConfig';
import { BLACK_COLOR, GREY_TEXT_COLOR } from '@/helpers/constants/Colors';

interface CallRequestValues {
  phone: string;
  name: string;
  question: string;
}

const initialValues = {
  phone: '',
  name: '',
  question: '',
};

const CallRequest = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'profile.support',
  });
  const { t: tInput } = useTranslation('translation', {
    keyPrefix: 'input',
  });
  const { session } = useSession();

  const formik = useFormik<CallRequestValues>({
    initialValues,
    validationSchema: CallRequestValidationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values) => {
      const { name, phone, question } = values;
      const docRef = await addDoc(collection(db, 'callRequest'), {
        userName: name,
        userPhone: phone,
        userQuestion: question,
        dateOfRequest: dayjs().locale('ru').format('D MMMM YYYY, HH:mm'),
        isDone: false,
        isAuthUser: !!session,
      });
      updateDoc(doc(db, 'callRequest', docRef.id), {
        id: docRef.id,
      });
    },
  });

  const { values, submitForm, setFieldValue, errors } = formik;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.tipTitle}>{t('tipTitle')}</Text>
      <PhoneNumberInput
        value={values.phone}
        onChange={(v) => setFieldValue('phone', v)}
        error={errors.phone}
      />
      <OutlinedInput
        inputType="text"
        placeholder={tInput('namePlaceholder')}
        value={values.name}
        onChange={(v) => setFieldValue('name', v)}
        error={errors.name}
      />
      <OutlinedInput
        inputType="text"
        placeholder={tInput('questionPlaceholder')}
        value={values.question}
        onChange={(v) => setFieldValue('question', v)}
        error={errors.question}
      />
      <DefaultButton label={t('request')} onClick={() => submitForm()} />
    </View>
  );
};

export default CallRequest;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: BLACK_COLOR,
    paddingHorizontal: 16,
    paddingTop: 26,
    gap: 12,
  },
  tipTitle: {
    fontFamily: 'Mont_400',
    fontSize: 14,
    color: GREY_TEXT_COLOR,
    paddingBottom: 16,
    // paddingHorizontal: 16,
  },
});
