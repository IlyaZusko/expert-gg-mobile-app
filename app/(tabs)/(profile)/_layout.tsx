import { Stack } from 'expo-router';
import React from 'react';

const ProfileLayout = () => {
  return (
    <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="edit-profile" options={{ headerShown: true }} />
    </Stack>
  );
};

export default ProfileLayout;
