import { Image } from 'expo-image';
import { Redirect, Tabs } from 'expo-router';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { useSession } from '@/context/ctx';
import { db } from '@/firebaseConfig';
import {
  BLACK_COLOR,
  COVER_COLOR,
  INACTIVE_COLOR,
  WHITE_COLOR,
} from '@/helpers/constants/Colors';
import { IProfile } from '@/store/models/Profile';
import { setUserProfile } from '@/store/service/userSlice';

const TabsLayout = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'navigation',
  });
  const { session, isLoading } = useSession();
  const [coins, setCoins] = useState<number | null>(null);
  const dispatch = useDispatch();

  if (isLoading) {
    return <View />;
  }

  if (!session) {
    return <Redirect href="/(auth)/" />;
  }

  if (session) {
    onSnapshot(doc(db, 'users', session), (doc) => {
      const data = doc.data();
      if (data) {
        setCoins(data.coins);
        dispatch(setUserProfile(data as IProfile));
      }
    });
  }
  return (
    <Tabs
      initialRouteName="play"
      screenOptions={({ route, navigation }) => {
        const state = navigation.getState();
        const hasNestedNavigation = state.routes[state.index].state?.index > 0;
        return {
          tabBarStyle: {
            height: 84,
            borderTopWidth: 0,
            backgroundColor: COVER_COLOR,
          },
          headerTitleAlign: 'left',
          tabBarActiveTintColor: WHITE_COLOR,
          tabBarInactiveTintColor: INACTIVE_COLOR,
          headerShown: !hasNestedNavigation,
          tabBarShowLabel: false,
          headerTitleStyle: {
            color: WHITE_COLOR,
            fontFamily: 'Mont_700',
            fontSize: 32,
          },
          headerStyle: {
            height: 92,
            backgroundColor: BLACK_COLOR,
            shadowOpacity: 0,
          },
          headerRight: () => (
            <View style={styles.coinsContainer}>
              <Text style={styles.coinsTitle}>{coins}</Text>
              <Image
                source={require('assets/icons/coins-gold.svg')}
                style={{ width: 30, height: 30 }}
              />
            </View>
          ),
        };
      }}
    >
      <Tabs.Screen
        name="play"
        options={{
          href: '/play',
          title: t('play'),
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabBarItemContainer}>
              <Image
                style={{ width: 24, height: 24 }}
                source={
                  focused
                    ? require('assets/icons/tab-swords-active.svg')
                    : require('assets/icons/tab-swords-inactive.svg')
                }
              />
              <Text style={[styles.tabBarItemTitle, { color }]}>
                {t('play')}
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="my-votes"
        options={{
          href: '/my-votes',
          title: t('myVotes'),
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabBarItemContainer}>
              <Image
                style={{ width: 24, height: 24 }}
                source={
                  focused
                    ? require('assets/icons/tab-votes-active.svg')
                    : require('assets/icons/tab-votes-inactive.svg')
                }
              />
              <Text style={[styles.tabBarItemTitle, { color }]}>
                {t('myVotes')}
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          href: '/leaderboard',
          title: t('leaderboard'),
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabBarItemContainer}>
              <Image
                style={{ width: 24, height: 24 }}
                source={
                  focused
                    ? require('assets/icons/tab-trophy-active.svg')
                    : require('assets/icons/tab-trophy-inactive.svg')
                }
              />
              <Text style={[styles.tabBarItemTitle, { color }]}>
                {t('leaderboard')}
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          href: '(profile)',
          title: t('profile'),
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabBarItemContainer}>
              <Image
                style={{ width: 24, height: 24 }}
                source={
                  focused
                    ? require('assets/icons/tab-user-active.svg')
                    : require('assets/icons/tab-user-inactive.svg')
                }
              />
              <Text style={[styles.tabBarItemTitle, { color }]}>
                {t('profile')}
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  tabBarItemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 7,
    backgroundColor: 'transparent',
  },
  tabBarItemTitle: {
    fontFamily: 'Mont_500',
    marginTop: 6,
    fontSize: 10,
  },
  headerProfileButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 16,
    gap: 20,
  },
  coinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingRight: 16,
  },
  coinsTitle: {
    fontFamily: 'Mont_600',
    color: WHITE_COLOR,
    fontSize: 20,
  },
});
