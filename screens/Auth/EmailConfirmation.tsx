import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  LINEAR_END_COLOR,
  LINEAR_START_COLOR,
  WHITE_COLOR,
} from '@/helpers/constants/Colors';

const EmailConfirmation = () => {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={[LINEAR_START_COLOR, LINEAR_END_COLOR]}
        style={styles.linearContainer}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <Text style={styles.mainTilte}>Активируйте свой аккаунт Expert GG</Text>
        <Text style={styles.subTilte}>
          Мы отправили письмо на вашу электронную почту. Пожалуйста, проверьте
          свою электронную почту и нажмите на ссылку для подтверждения, прежде
          чем войти в систему в первый раз
        </Text>
      </LinearGradient>
    </View>
  );
};

export default EmailConfirmation;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  linearContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 31,
    paddingBottom: 16,
    paddingTop: 80,
    gap: 20,
  },
  mainTilte: {
    fontFamily: 'Mont_600',
    fontSize: 16,
    color: WHITE_COLOR,
  },
  subTilte: {
    fontFamily: 'Mont_500',
    fontSize: 14,
    color: WHITE_COLOR,
  },
});
