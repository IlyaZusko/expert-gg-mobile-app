import React, { InputHTMLAttributes, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text } from 'react-native';
import MaskInput from 'react-native-mask-input';

import {
  ERROR_RED_COLOR,
  INACTIVE_COLOR,
  WHITE_COLOR,
} from '@/helpers/constants/Colors';

interface IPhoneNumberInput
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  isSecureText?: boolean;
  value?: string;
  onChange: (v: string) => void;
  error?: string;
}

const inputMask = [
  '+',
  '3',
  '7',
  '5',
  ' ',
  '(',
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
];

const PhoneNumberInput: React.FC<IPhoneNumberInput> = ({
  isSecureText,
  value,
  onChange,
  error,
  ...props
}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'errors',
  });
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <View style={styles.wrapper}>
      <MaskInput
        value={value}
        onChangeText={(masked) => onChange(masked)}
        style={[
          styles.input,
          {
            borderColor: error
              ? ERROR_RED_COLOR
              : isFocused
                ? WHITE_COLOR
                : INACTIVE_COLOR,
          },
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        keyboardType="decimal-pad"
        mask={inputMask}
      />
      {error && <Text style={styles.errorTitle}>{t(error)}</Text>}
    </View>
  );
};

export default PhoneNumberInput;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'column',
    gap: 4,
  },
  input: {
    width: '100%',
    height: 50,
    paddingLeft: 24,
    borderWidth: 1,
    borderColor: WHITE_COLOR,
    borderRadius: 10000,
    fontFamily: 'Mont_500',
    color: WHITE_COLOR,
  },
  errorTitle: {
    fontFamily: 'Mont_500',
    fontSize: 12,
    color: ERROR_RED_COLOR,
    paddingHorizontal: 24,
  },
});
