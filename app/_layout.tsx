import {
  useFonts,
  Montserrat_400Regular as Mont_400,
  Montserrat_500Medium as Mont_500,
  Montserrat_700Bold as Mont_700,
} from '@expo-google-fonts/montserrat';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    Mont_400,
    Mont_500,
    Mont_700,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default RootLayout;
