import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import {
  collection,
  doc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TeamButtonSelect from './TeamButton';
import VoteStatusBadge from './VoteStatusBadge';

import { useSession } from '@/context/ctx';
import { db } from '@/firebaseConfig';
import {
  COVER_COLOR,
  CRICKET_GREEN_COLOR,
  ERROR_RED_COLOR,
  GOLD_COLOR,
  GREY_TEXT_COLOR,
  INACTIVE_COLOR,
  WHITE_COLOR,
} from '@/helpers/constants/Colors';
import { IBet } from '@/store/models/Profile';
import { IVotedMatch } from '@/store/models/VotedMatches';

interface IVoteBlock {
  item: IVotedMatch;
}

const VoteBlock = ({ item }: IVoteBlock) => {
  const { session } = useSession();
  const getStatusSymbol = (isWin: boolean | null) => {
    if (isWin === null) {
      return '';
    } else if (isWin) {
      return '+ ';
    } else {
      return '- ';
    }
  };

  const teamOneLogo = item.opponents[0].opponent.image_url
    ? { uri: item.opponents[0].opponent.image_url }
    : require('assets/icons/small-logo.svg');

  const teamOTwoLogo = item.opponents[1].opponent.image_url
    ? { uri: item.opponents[1].opponent.image_url }
    : require('assets/icons/small-logo.svg');

  const isWin =
    item.winner === null ? null : item.winner.name === item.bet_target_name;

  const updateBetResult = async () => {
    const bets: IBet[] = [];
    const q = query(collection(db, 'bets'), where('user_id', '==', session));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((bet) => {
      bets.push({ ...bet.data(), document_id: bet.id } as IBet);
    });
    const targetBet = bets.find((bet) => bet.match_id === item.id);
    const targetBetDocId = targetBet?.document_id;
    if (targetBet?.isBetWon === null && targetBetDocId && session) {
      await updateDoc(doc(db, 'bets', targetBetDocId), {
        isBetWon: isWin,
      });
      await updateDoc(doc(db, 'users', session), {
        count_wins: increment(1),
        total_earn: increment(targetBet.coins_amount),
      });
    }
  };

  if (isWin !== null && session) {
    updateBetResult();
  }

  return (
    <View style={styles.wrapper}>
      <VoteStatusBadge isWin={isWin} />
      <View style={styles.gameInfoContainer}>
        <Text style={styles.gameInfoTitle}>{item.videogame.name}</Text>
        <Text style={styles.gameInfoTitle}>{item.league.name}</Text>
      </View>
      <View style={styles.teamsButtonsContainer}>
        <TeamButtonSelect
          teamName={item.opponents[0].opponent.name}
          teamIcon={teamOneLogo}
          isSelected={item.opponents[0].opponent.name === item.bet_target_name}
          isLeftAlign
          isDisabled
        />
        <Text style={styles.versusTitle}>VS</Text>
        <TeamButtonSelect
          teamName={item.opponents[1].opponent.name}
          teamIcon={teamOTwoLogo}
          isSelected={item.opponents[1].opponent.name === item.bet_target_name}
          isDisabled
        />
      </View>
      <View style={styles.betInfoContainer}>
        <Text style={styles.clockTitle}>
          {dayjs(item.date_of_bet).locale('ru').format('DD MMMM YYYY, HH:mm')}
        </Text>
        <View style={styles.bet}>
          <Text
            style={[
              styles.gameInfoTitle,
              {
                color:
                  isWin === null
                    ? CRICKET_GREEN_COLOR
                    : isWin
                      ? GOLD_COLOR
                      : ERROR_RED_COLOR,
              },
            ]}
          >
            {getStatusSymbol(isWin)}
            {item.coins_amount} gg
          </Text>
        </View>
      </View>
    </View>
  );
};

export default VoteBlock;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: COVER_COLOR,
    paddingHorizontal: 16,
    paddingTop: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    borderRadius: 8,
  },
  gameInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignSelf: 'flex-end',
  },
  gameInfoTitle: {
    fontFamily: 'Mont_400',
    fontSize: 12,
    color: GREY_TEXT_COLOR,
  },
  teamsButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  versusTitle: {
    fontFamily: 'Mont_400',
    fontSize: 16,
    color: WHITE_COLOR,
  },
  clockTitle: {
    fontFamily: 'Mont_400',
    fontSize: 12,
    color: WHITE_COLOR,
  },
  betInfoContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
  },
  bet: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: INACTIVE_COLOR,
    borderRadius: 12,
  },
});
