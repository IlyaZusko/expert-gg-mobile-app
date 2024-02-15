import { Image, ImageSource } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import {
  ACCENT_BLUE_COLOR,
  ACCENT_GOLD_COLOR,
  WHITE_COLOR,
} from '@/helpers/constants/Colors';

interface IDefaultButton {
  label: string;
  onClick: () => void;
  isPrimary?: boolean;
  icon?:
    | string
    | number
    | string[]
    | ImageSource
    | ImageSource[]
    | null
    | undefined;
}

const DefaultButton: React.FC<IDefaultButton> = ({
  label,
  onClick,
  isPrimary,
  icon,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        styles.button,
        { backgroundColor: isPrimary ? ACCENT_GOLD_COLOR : ACCENT_BLUE_COLOR },
      ]}
    >
      {icon && (
        <Image
          source={icon}
          style={{ width: 24, height: 24, marginRight: 8 }}
        />
      )}
      <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export default DefaultButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    borderRadius: 10000,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontFamily: 'Mont_600',
    color: WHITE_COLOR,
  },
});
