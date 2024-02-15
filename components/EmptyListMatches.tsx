import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { GREY_TEXT_COLOR } from '@/helpers/constants/Colors';

const EmptyListMatches = () => {
  return (
    <View style={styles.wrapper}>
      <Image
        source={require('assets/icons/small-logo-grey.svg')}
        style={{ width: 56, height: 56 }}
      />
      <Text style={styles.title}>
        Нет матчей, соответствующих заданным параметрам
      </Text>
    </View>
  );
};

export default EmptyListMatches;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingTop: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontFamily: 'Mont_400',
    fontSize: 22,
    textAlign: 'center',
    color: GREY_TEXT_COLOR,
  },
});
