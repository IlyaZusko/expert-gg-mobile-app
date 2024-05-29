import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { Image } from 'expo-image';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import TeamButtonSelect from './TeamButton';
import VoteStatusBadge from './VoteStatusBadge';

import { db } from '@/firebaseConfig';
import {
  ACCENT_BLUE_COLOR,
  ACCENT_GOLD_COLOR,
  BLACK_COLOR,
  COVER_COLOR,
  ERROR_RED_COLOR,
  GREY_TEXT_COLOR,
  INACTIVE_COLOR,
  WHITE_COLOR,
} from '@/helpers/constants/Colors';
import { IMatchesList } from '@/store/models/Matches';

interface IMatchBlock {
  item: IMatchesList;
  userId?: string | null;
  coins: number | null;
  refetch: () => void;
}

interface IBet {
  coinsAmount: string;
}

const initialValues = {
  coinsAmount: '',
};

const MatchBlock: React.FC<IMatchBlock> = ({
  item,
  userId,
  refetch,
  coins,
}) => {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'play',
  });
  const { t: tError } = useTranslation('translation', {
    keyPrefix: 'errors',
  });
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);

  const formik = useFormik<IBet>({
    initialValues,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const coinsAmount = Number(values.coinsAmount);
        if (coins && coinsAmount <= coins && coinsAmount !== 0) {
          const betData = {
            coins_amount: coinsAmount,
            match_id: item.id,
            bet_target_id: selectedTeamId,
            bet_target_name: selectedTeam,
            date_of_bet: dayjs().format(),
            isBetWon: null,
            user_id: userId,
          };
          if (userId) {
            await updateDoc(doc(db, 'users', userId), {
              coins: coins - coinsAmount,
            });
            const bet = await addDoc(collection(db, 'bets'), betData);
            await updateDoc(doc(db, 'bets', bet.id), {
              document_id: bet.id,
            });
          }
          setSelectedTeam(null);
          setSelectedTeamId(null);
          refetch();
        } else {
          setFieldError('coinsAmount', tError('makeBet'));
        }
      } catch (e) {
        console.log('error', e);
      }
    },
  });

  const { values, submitForm, setFieldValue, setFieldError, errors } = formik;

  const handleSelectTeam = (teamName: string, teamId: number) => {
    if (selectedTeam !== teamName) {
      setSelectedTeam(teamName);
      setSelectedTeamId(teamId);
    } else {
      setSelectedTeam(null);
      setSelectedTeamId(null);
    }
  };

  const teamOneLogo = item.opponents[0].opponent.image_url
    ? { uri: item.opponents[0].opponent.image_url }
    : require('assets/icons/small-logo.svg');

  const teamOTwoLogo = item.opponents[1].opponent.image_url
    ? { uri: item.opponents[1].opponent.image_url }
    : require('assets/icons/small-logo.svg');

  return (
    <View style={styles.wrapper}>
      {item.voted && <VoteStatusBadge isForMatches />}
      <Text style={styles.championshipTitle}>{item.league.name}</Text>
      <View style={styles.teamsButtonsContainer}>
        <TeamButtonSelect
          teamName={item.opponents[0].opponent.name}
          teamIcon={teamOneLogo}
          isLeftAlign
          isDisabled={item.voted}
          isSelected={selectedTeam === item.opponents[0].opponent.name}
          onClick={() =>
            handleSelectTeam(
              item.opponents[0].opponent.name,
              item.opponents[0].opponent.id,
            )
          }
        />
        <Text style={styles.versusTitle}>VS</Text>
        <TeamButtonSelect
          teamName={item.opponents[1].opponent.name}
          teamIcon={teamOTwoLogo}
          isDisabled={item.voted}
          isSelected={selectedTeam === item.opponents[1].opponent.name}
          onClick={() =>
            handleSelectTeam(
              item.opponents[1].opponent.name,
              item.opponents[1].opponent.id,
            )
          }
        />
      </View>
      {selectedTeam && (
        <View style={styles.betContainer}>
          <Text style={styles.teamButtonTitle}>
            {selectedTeam} {t('win')}
          </Text>
          <View style={styles.betFormContainer}>
            <View style={{ flex: 2 }}>
              <TextInput
                style={styles.betFormInput}
                inputMode="numeric"
                value={values.coinsAmount}
                onChangeText={(v) => setFieldValue('coinsAmount', v)}
              />
              {errors.coinsAmount && (
                <Text style={styles.errorTitle}>{errors.coinsAmount}</Text>
              )}
            </View>

            <TouchableOpacity
              style={[
                styles.betFormButton,
                { borderWidth: 1, borderColor: INACTIVE_COLOR },
              ]}
              onPress={() => setSelectedTeam(null)}
            >
              <Text style={styles.betFormButtonTitle}>{t('cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.betFormButton,
                { backgroundColor: ACCENT_GOLD_COLOR },
              ]}
              onPress={() => submitForm()}
            >
              <Text
                style={[styles.betFormButtonTitle, { fontFamily: 'Mont_600' }]}
              >
                {t('bet')}
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
          {dayjs(item.begin_at)
            .locale(i18n.language)
            .format('DD MMMM YYYY, HH:mm')}
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
    color: GREY_TEXT_COLOR,
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
    color: GREY_TEXT_COLOR,
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
  errorTitle: {
    fontFamily: 'Mont_500',
    fontSize: 12,
    color: ERROR_RED_COLOR,
    paddingTop: 4,
  },
});
