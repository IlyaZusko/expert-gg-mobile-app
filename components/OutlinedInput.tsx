import React, { InputHTMLAttributes, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  InputModeOptions,
  StyleSheet,
  TextInput,
  View,
  Text,
} from 'react-native';

import {
  ERROR_RED_COLOR,
  INACTIVE_COLOR,
  WHITE_COLOR,
} from '@/helpers/constants/Colors';

interface IOutlinedInput
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  inputType: InputModeOptions;
  placeholder: string;
  isSecureText?: boolean;
  value?: string;
  onChange: (v: string) => void;
  error?: string;
}

const OutlinedInput: React.FC<IOutlinedInput> = ({
  inputType,
  placeholder,
  isSecureText,
  value,
  onChange,
  error,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { t } = useTranslation('translation', {
    keyPrefix: 'errors',
  });

  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={isSecureText}
        value={value}
        onChangeText={(e) => onChange(e)}
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
      />
      {error && <Text style={styles.errorTitle}>{t(error)}</Text>}
    </View>
  );
};

export default OutlinedInput;

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
