import { Image, ImageSource } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import {
  ACCENT_BLUE_COLOR,
  INACTIVE_COLOR,
  WHITE_COLOR,
} from '@/helpers/constants/Colors';

interface ITeamButton {
  isLeftAlign?: boolean;
  teamName: string;
  teamIcon:
    | string
    | number
    | string[]
    | ImageSource
    | ImageSource[]
    | null
    | undefined;
  isDisabled?: boolean;
  onClick?: () => void;
  isSelected?: boolean;
}

const TeamButtonSelect: React.FC<ITeamButton> = ({
  isLeftAlign,
  teamIcon,
  teamName,
  isDisabled,
  onClick,
  isSelected,
}) => {
  const trimString = (str: string) => {
    if (str.length > 13) {
      return str.slice(0, 13).concat('...');
    }
    return str;
  };

  return (
    <TouchableOpacity
      style={[
        styles.teamButton,
        {
          justifyContent: 'flex-end',
          paddingRight: 16,
          borderColor: isSelected ? ACCENT_BLUE_COLOR : INACTIVE_COLOR,
          flexDirection: isLeftAlign ? 'row' : 'row-reverse',
        },
      ]}
      disabled={isDisabled}
      onPress={onClick}
    >
      <Text style={styles.teamButtonTitle}>{trimString(teamName)}</Text>
      <Image
        source={teamIcon}
        style={{ width: 24, height: 24 }}
        contentFit="contain"
      />
    </TouchableOpacity>
  );
};

export default TeamButtonSelect;

const styles = StyleSheet.create({
  teamButton: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: INACTIVE_COLOR,
    borderRadius: 8,
  },
  teamButtonTitle: {
    fontFamily: 'Mont_400',
    fontSize: 12,
    color: WHITE_COLOR,
  },
});
