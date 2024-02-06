import { Image } from 'expo-image';
import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import {
  BLACK_COLOR,
  COVER_COLOR,
  INACTIVE_COLOR,
  WHITE_COLOR,
} from '@/constants/Colors';

const TabsLayout = () => {
  return (
    <Tabs
      initialRouteName="profile"
      screenOptions={{
        tabBarStyle: {
          height: 84,
          borderTopWidth: 0,
          backgroundColor: COVER_COLOR,
        },
        headerTitleAlign: 'left',
        tabBarActiveTintColor: WHITE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        headerShown: true,
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
      }}
    >
      <Tabs.Screen
        name="play"
        options={{
          href: '/play',
          title: 'Игра',
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
              <Text style={[styles.tabBarItemTitle, { color }]}>Игра</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="my-votes"
        options={{
          href: '/my-votes',
          title: 'Мои Ставки',
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
                Мои Ставки
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          href: '/leaderboard',
          title: 'Лидерборд',
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
              <Text style={[styles.tabBarItemTitle, { color }]}>Лидерборд</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: '/profile',
          title: 'Профиль',
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
              <Text style={[styles.tabBarItemTitle, { color }]}>Профиль</Text>
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
});
