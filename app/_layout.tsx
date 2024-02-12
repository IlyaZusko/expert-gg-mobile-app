import {
  useFonts,
  Montserrat_400Regular as Mont_400,
  Montserrat_500Medium as Mont_500,
  Montserrat_600SemiBold as Mont_600,
  Montserrat_700Bold as Mont_700,
} from '@expo-google-fonts/montserrat';
import { Slot, SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';

import { SessionProvider } from '@/context/ctx';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    Mont_400,
    Mont_500,
    Mont_600,
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
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
};

export default RootLayout;
