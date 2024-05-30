import { Stack } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { HeaderStackScreen } from '@/components';

const ProfileLayout = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'navigation',
  });
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        header: ({ options, navigation }) => (
          <HeaderStackScreen
            title={options.title}
            onClick={() => navigation.goBack()}
          />
        ),
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="edit-profile"
        options={{ headerShown: true, title: t('editAccount') }}
      />
      <Stack.Screen
        name="call-request"
        options={{ headerShown: true, title: t('callRequest') }}
      />
      <Stack.Screen
        name="faq"
        options={{ headerShown: true, title: t('faq') }}
      />
      <Stack.Screen
        name="reward"
        options={{ headerShown: true, title: t('getCoins') }}
      />
      <Stack.Screen
        name="settings/index"
        options={{ headerShown: true, title: t('settings') }}
      />
      <Stack.Screen
        name="settings/language"
        options={{ headerShown: true, title: t('language') }}
      />
      <Stack.Screen
        name="settings/password-change"
        options={{ headerShown: true, title: t('passwordChange') }}
      />
    </Stack>
  );
};

export default ProfileLayout;
