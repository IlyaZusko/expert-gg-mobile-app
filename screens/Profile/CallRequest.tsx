import dayjs from 'dayjs';
import * as Clipboard from 'expo-clipboard';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

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
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  const formik = useFormik<CallRequestValues>({
    initialValues,
    validationSchema: CallRequestValidationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values) => {
      const { name, phone, question } = values;
      setIsButtonLoading(true);
      try {
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
        setIsButtonLoading(false);
        Toast.show({
          type: 'success',
          text1: t('alertMainTitle'),
          text2: t('alertSubTitle'),
        });
      } catch (err) {
        setIsButtonLoading(false);
        console.log(err);
      }
    },
  });

  const handleCopyEmail = async () => {
    await Clipboard.setStringAsync('expert.gg.support@gmail.com');
    Toast.show({
      type: 'success',
      text1: t('alertMainTitleCopy'),
      text2: t('alertSubTitleCopy'),
    });
  };

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
      <DefaultButton
        label={t('request')}
        onClick={() => submitForm()}
        isLoading={isButtonLoading}
      />
      <View style={styles.mailWrapper}>
        <Text style={styles.termsTitle}>{t('mailTip')}</Text>
        <TouchableOpacity onPress={() => handleCopyEmail()}>
          <Text
            style={[styles.termsTitle, { textDecorationLine: 'underline' }]}
          >
            expert.gg.support@gmail.com
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CallRequest;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: BLACK_COLOR,
    paddingHorizontal: 16,
    paddingTop: 10,
    gap: 12,
  },
  tipTitle: {
    fontFamily: 'Mont_400',
    fontSize: 14,
    color: GREY_TEXT_COLOR,
    paddingBottom: 16,
    // paddingHorizontal: 16,
  },
  mailWrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 14,
    gap: 2,
  },
  termsTitle: {
    fontFamily: 'Mont_500',
    fontSize: 12,
    color: GREY_TEXT_COLOR,
  },
});
