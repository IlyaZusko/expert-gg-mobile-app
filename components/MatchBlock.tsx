import dayjs from 'dayjs';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  ACCENT_BLUE_COLOR,
  ACCENT_GOLD_COLOR,
  BLACK_COLOR,
  COVER_COLOR,
  INACTIVE_COLOR,
  WHITE_COLOR,
} from '@/helpers/constants/Colors';
import { IMatchesList } from '@/store/models/Matches';

interface IMatchBlock {
  item: IMatchesList;
}

const MatchBlock: React.FC<IMatchBlock> = ({ item }) => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const handleSelectTeam = (teamName: string) => {
    if (selectedTeam !== teamName) {
      setSelectedTeam(teamName);
    } else {
      setSelectedTeam(null);
    }
  };

  const trimString = (str: string) => {
    if (str.length > 13) {
      return str.slice(0, 13).concat('...');
    }
    return str;
  };

  const teamOneLogo = item.opponents[0].opponent.image_url
    ? { uri: item.opponents[0].opponent.image_url }
    : require('assets/icons/small-logo.svg');

  const teamOTwoLogo = item.opponents[1].opponent.image_url
    ? { uri: item.opponents[1].opponent.image_url }
    : require('assets/icons/small-logo.svg');

  return (
    <View style={styles.wrapper}>
      {/* {item.isVoted && (
        <View style={styles.votedBadge}>
          <Text style={styles.votedBadgeTitle}>Voted</Text>
        </View>
      )} */}
      <Text style={styles.championshipTitle}>{item.league.name}</Text>
      <View style={styles.teamsButtonsContainer}>
        <TouchableOpacity
          style={[
            styles.teamButton,
            {
              justifyContent: 'flex-end',
              paddingRight: 16,
              borderColor:
                selectedTeam === item.opponents[0].opponent.name
                  ? ACCENT_BLUE_COLOR
                  : INACTIVE_COLOR,
            },
          ]}
          onPress={() => handleSelectTeam(item.opponents[0].opponent.name)}
        >
          <Text style={styles.teamButtonTitle}>
            {trimString(item.opponents[0].opponent.name)}
          </Text>
          <Image
            source={teamOneLogo}
            style={{ width: 24, height: 24 }}
            contentFit="contain"
          />
        </TouchableOpacity>
        <Text style={styles.versusTitle}>VS</Text>
        <TouchableOpacity
          style={[
            styles.teamButton,
            {
              paddingLeft: 16,
              borderColor:
                selectedTeam === item.opponents[1].opponent.name
                  ? ACCENT_BLUE_COLOR
                  : INACTIVE_COLOR,
            },
          ]}
          onPress={() => handleSelectTeam(item.opponents[1].opponent.name)}
        >
          <Image
            source={teamOTwoLogo}
            style={{ width: 24, height: 24 }}
            contentFit="contain"
          />
          <Text style={styles.teamButtonTitle}>
            {trimString(item.opponents[1].opponent.name)}
          </Text>
        </TouchableOpacity>
      </View>
      {selectedTeam && (
        <View style={styles.betContainer}>
          <Text style={styles.teamButtonTitle}>{selectedTeam} Выиграет</Text>
          <View style={styles.betFormContainer}>
            <TextInput style={styles.betFormInput} inputMode="numeric" />
            <TouchableOpacity
              style={[
                styles.betFormButton,
                { borderWidth: 1, borderColor: INACTIVE_COLOR },
              ]}
              onPress={() => setSelectedTeam(null)}
            >
              <Text style={styles.betFormButtonTitle}>Отмена</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.betFormButton,
                { backgroundColor: ACCENT_GOLD_COLOR },
              ]}
            >
              <Text
                style={[styles.betFormButtonTitle, { fontFamily: 'Mont_600' }]}
              >
                Ставка
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={styles.clockContainer}>
        <Image
          source={require('assets/icons/clock.svg')}
          style={{ width: 12, height: 12 }}
        />
        <Text style={styles.clockTitle}>
          {dayjs(item.begin_at).format('DD.MM.YY HH:mm')}
        </Text>
      </View>
    </View>
  );
};

export default MatchBlock;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: COVER_COLOR,
    paddingHorizontal: 8,
    paddingTop: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    borderRadius: 8,
  },
  championshipTitle: {
    fontFamily: 'Mont_500',
    fontSize: 14,
    color: '#959595',
  },
  teamsButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
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
  versusTitle: {
    fontFamily: 'Mont_400',
    fontSize: 16,
    color: WHITE_COLOR,
  },
  teamButtonTitle: {
    fontFamily: 'Mont_400',
    fontSize: 12,
    color: WHITE_COLOR,
  },
  clockContainer: {
    backgroundColor: BLACK_COLOR,
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
  },
  clockTitle: {
    fontFamily: 'Mont_400',
    fontSize: 14,
    color: '#959595',
  },
  votedBadge: {
    position: 'absolute',
    top: 12,
    left: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: ACCENT_BLUE_COLOR,
    borderRadius: 10000,
  },
  votedBadgeTitle: {
    fontFamily: 'Mont_400',
    fontSize: 12,
    color: WHITE_COLOR,
  },
  betContainer: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: INACTIVE_COLOR,
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 14,
  },
  betFormContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 9,
  },
  betFormInput: {
    flex: 2,
    height: 32,
    borderWidth: 1,
    borderColor: INACTIVE_COLOR,
    borderRadius: 4,
    textAlign: 'center',
    fontFamily: 'Mont_600',
    fontSize: 16,
    color: WHITE_COLOR,
  },
  betFormButton: {
    flex: 1,
    height: 32,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  betFormButtonTitle: {
    fontFamily: 'Mont_400',
    fontSize: 14,
    color: WHITE_COLOR,
  },
});
