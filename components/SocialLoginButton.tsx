// import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { INACTIVE_COLOR, WHITE_COLOR } from '@/constants/Colors';

interface ISocialLoginButton {
  label: string;
  icon?: string;
}

const SocialLoginButton: React.FC<ISocialLoginButton> = ({ label, icon }) => {
  return (
    <TouchableOpacity style={styles.wrapper}>
      <View style={styles.iconBorder}>{/* <Image  /> */}</View>
      <Text style={styles.buttonTitle}>{label}</Text>
    </TouchableOpacity>
  );
};

export default SocialLoginButton;

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    alignItems: 'center',
  },
  iconBorder: {
    width: 52,
    height: 52,
    borderWidth: 1,
    borderColor: INACTIVE_COLOR,
    borderRadius: 10000,
  },
  buttonTitle: {
    fontFamily: 'Mont_500',
    color: WHITE_COLOR,
    fontSize: 10,
  },
});
