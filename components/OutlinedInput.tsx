import { Image } from 'expo-image';
import React, { InputHTMLAttributes, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  InputModeOptions,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
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
  const [isHide, setIsHide] = useState<boolean>(true);
  const { t } = useTranslation('translation', {
    keyPrefix: 'errors',
  });

  return (
    <View style={styles.wrapper}>
      {isSecureText ? (
        <View
          style={[
            styles.inputPasswordWrapper,
            {
              borderColor: error
                ? ERROR_RED_COLOR
                : isFocused
                  ? WHITE_COLOR
                  : INACTIVE_COLOR,
            },
          ]}
        >
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={INACTIVE_COLOR}
            secureTextEntry={isHide}
            value={value}
            onChangeText={(e) => onChange(e)}
            style={styles.inputPassword}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <TouchableOpacity
            style={{
              width: 44,
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => setIsHide((prev) => !prev)}
          >
            <Image
              source={
                isHide
                  ? require('assets/icons/eye-off.svg')
                  : require('assets/icons/eye.svg')
              }
              style={{ width: 22, height: 22 }}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={INACTIVE_COLOR}
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
      )}

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
    fontFamily: 'Mont_500',
    color: WHITE_COLOR,
    paddingLeft: 24,
    borderWidth: 1,
    borderColor: WHITE_COLOR,
    borderRadius: 10000,
  },
  inputPasswordWrapper: {
    width: '100%',
    height: 50,
    paddingLeft: 24,
    borderWidth: 1,
    borderColor: WHITE_COLOR,
    borderRadius: 10000,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputPassword: {
    width: '80%',
    height: 50,
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
