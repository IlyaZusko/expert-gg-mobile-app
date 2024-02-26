import { Stack } from 'expo-router';
import React from 'react';

import { HeaderStackScreen } from '@/components';

const ProfileLayout = () => {
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
        options={{ headerShown: true, title: 'Редактировать аккаунт' }}
      />
    </Stack>
  );
};

export default ProfileLayout;
