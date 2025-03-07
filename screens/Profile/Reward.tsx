import dayjs from 'dayjs';
import { Image } from 'expo-image';
import { doc, increment, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
// import {
// RewardedAd,
// RewardedAdEventType,
// TestIds,
// } from 'react-native-google-mobile-ads';

import { DefaultButton } from '@/components';
import { useSession } from '@/context/ctx';
import { db } from '@/firebaseConfig';
import {
  BLACK_COLOR,
  COVER_COLOR,
  INACTIVE_COLOR,
  WHITE_COLOR,
} from '@/helpers/constants/Colors';

// const rewarded = RewardedAd.createForAdRequest(
//   'ca-app-pub-6257067147314410~7423530535',
//   {
//     requestNonPersonalizedAdsOnly: true,
//     keywords: ['fashion', 'clothing'],
//   },
// );

const Reward = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'profile.reward',
  });
  const { session } = useSession();
  const [userTimeout, setUserTimeout] = useState<string>('');
  if (session) {
    onSnapshot(doc(db, 'users', session), (doc) => {
      const data = doc.data();
      if (data) {
        setUserTimeout(data.ad_view_date);
      }
    });
  }
  const calculateTimeLeft = () => {
    const now = dayjs();
    const end = dayjs(userTimeout).add(3, 'hours');
    const difference = end.diff(now, 'second');

    if (difference > 0) {
      const hours = Math.floor(difference / 3600);
      const minutes = Math.floor((difference % 3600) / 60);
      const seconds = difference % 60;

      return { hours, minutes, seconds };
    }

    return { hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [userTimeout]);

  // useEffect(() => {
  //   const unsubscribeLoaded = rewarded.addAdEventListener(
  //     RewardedAdEventType.LOADED,
  //     () => {
  //       setLoaded(true);
  //     },
  //   );
  //   const unsubscribeEarned = rewarded.addAdEventListener(
  //     RewardedAdEventType.EARNED_REWARD,
  //     (reward) => {
  //       console.log('User earned reward of ', reward);
  //     },
  //   );

  //   // Start loading the rewarded ad straight away
  //   rewarded.load();

  //   // Unsubscribe from events on unmount
  //   return () => {
  //     unsubscribeLoaded();
  //     unsubscribeEarned();
  //   };
  // }, []);

  const handleShowAd = async () => {
    if (session) {
      await updateDoc(doc(db, 'users', session), {
        ad_view_date: dayjs().toISOString(),
        coins: increment(100),
      });
    }
  };

  const isCanGetReward = () => {
    if (
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.contentContainer}>
        <Text style={styles.mainGetTitle}>
          {t(isCanGetReward() ? 'mainTitleActive' : 'mainTitleInactive')}
        </Text>
        {isCanGetReward() ? (
          <View style={styles.getRewardContainer}>
            <View>
              <Image
                source={require('assets/images/coins-image-s.svg')}
                style={{ width: 100, height: 100 }}
              />
              <Text style={styles.coinsTitle}>100 GG</Text>
            </View>
            <DefaultButton
              label={t('getCoinsButton')}
              onClick={() => handleShowAd()}
              icon={require('assets/icons/ad-icon.svg')}
            />
          </View>
        ) : (
          <View style={styles.timerContainer}>
            <View style={{ flex: 1 }}>
              <View style={styles.timerItem}>
                <Text style={styles.timerItemTitle}>
                  {timeLeft.hours.toString().padStart(2, '0')}
                </Text>
              </View>
              <Text style={styles.timeTitle}>{t('hours')}</Text>
            </View>

            <View style={{ flex: 1 }}>
              <View style={styles.timerItem}>
                <Text style={styles.timerItemTitle}>
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </Text>
              </View>
              <Text style={styles.timeTitle}>{t('minutes')}</Text>
            </View>

            <View style={{ flex: 1 }}>
              <View style={styles.timerItem}>
                <Text style={styles.timerItemTitle}>
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </Text>
              </View>
              <Text style={styles.timeTitle}>{t('seconds')}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Reward;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: BLACK_COLOR,
    paddingTop: 16,
    paddingHorizontal: 16,
    display: 'flex',
  },
  contentContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COVER_COLOR,
    paddingTop: 16,
    paddingHorizontal: 26,
    paddingBottom: 24,
    gap: 22,
    borderRadius: 8,
  },
  getRewardContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  mainGetTitle: {
    fontFamily: 'Mont_600',
    fontSize: 18,
    color: WHITE_COLOR,
    textAlign: 'center',
  },
  coinsTitle: {
    fontFamily: 'Mont_600',
    color: '#FFEA32',
    fontSize: 24,
    textAlign: 'center',
  },
  timerContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 16,
  },
  timerItem: {
    width: '100%',
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: INACTIVE_COLOR,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerItemTitle: {
    fontFamily: 'Mont_700',
    fontSize: 48,
    color: WHITE_COLOR,
  },
  timeTitle: {
    fontFamily: 'Mont_500',
    fontSize: 12,
    color: WHITE_COLOR,
    textAlign: 'center',
    marginTop: 8,
  },
});
