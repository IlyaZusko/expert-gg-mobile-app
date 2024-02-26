import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { BLACK_COLOR, WHITE_COLOR } from '@/helpers/constants/Colors';

interface IHeaderStackScreen {
  title?: string;
  onClick: () => void;
}

const HeaderStackScreen: React.FC<IHeaderStackScreen> = ({
  title,
  onClick,
}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={{ position: 'absolute', left: 16, bottom: 12 }}
        onPress={onClick}
      >
        <Image
          source={require('assets/icons/back-left-arrow.svg')}
          style={{ width: 12, height: 20.5 }}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default HeaderStackScreen;

const styles = StyleSheet.create({
  wrapper: {
    height: 88,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: 12,
    backgroundColor: BLACK_COLOR,
  },
  title: {
    fontFamily: 'Mont_600',
    fontSize: 17,
    color: WHITE_COLOR,
  },
});
