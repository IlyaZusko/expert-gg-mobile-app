import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { BLACK_COLOR, WHITE_COLOR } from '@/helpers/constants/Colors';

interface IGameSelectorButton {
  title: string;
  imageUrl: string;
  id: string;
  checkedKey: string;
  onClick: (key: string) => void;
}

const GameSelectorButton: React.FC<IGameSelectorButton> = ({
  title,
  imageUrl,
  id,
  checkedKey,
  onClick,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.item, { borderBottomWidth: checkedKey === id ? 1 : 0 }]}
      onPress={() => onClick(id)}
    >
      <Image source={imageUrl} style={{ width: 32, height: 32 }} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default GameSelectorButton;

const styles = StyleSheet.create({
  item: {
    backgroundColor: BLACK_COLOR,
    height: 36,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingBottom: 4,
    gap: 4,
    borderBottomColor: WHITE_COLOR,
  },
  title: {
    fontFamily: 'Mont_500',
    fontSize: 14,
    color: WHITE_COLOR,
  },
});
