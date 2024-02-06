import React from 'react';
import { View, Text } from 'react-native';

import { BLACK_COLOR } from '@/constants/Colors';

const PlayScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: BLACK_COLOR }}>
      <Text style={{ fontFamily: 'Mont_400' }}>Игра</Text>
    </View>
  );
};

export default PlayScreen;
