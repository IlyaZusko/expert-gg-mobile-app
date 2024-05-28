import { Stack } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { HeaderStackScreen } from '@/components';

const AuthLayout = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'navigation',
  });

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        header: ({ options, navigation }) => (
          <HeaderStackScreen
            title={options.title}
            onClick={() => navigation.goBack()}
          />
        ),
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="email-confirm" options={{ headerShown: false }} />
      <Stack.Screen
        name="call-request"
        options={{ headerShown: true, title: t('callRequest') }}
      />
    </Stack>
  );
};

export default AuthLayout;
