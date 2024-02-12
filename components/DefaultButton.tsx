import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { ACCENT_BLUE_COLOR, WHITE_COLOR } from '@/constants/Colors';

interface IDefaultButton {
  label: string;
  onClick: () => void;
}

const DefaultButton: React.FC<IDefaultButton> = ({
  label,
  onClick,
  ...props
}) => {
  return (
    <TouchableOpacity onPress={onClick} style={styles.button}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export default DefaultButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    backgroundColor: ACCENT_BLUE_COLOR,
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
