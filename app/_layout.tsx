import {
  useFonts,
  Montserrat_400Regular as Mont_400,
  Montserrat_500Medium as Mont_500,
  Montserrat_600SemiBold as Mont_600,
  Montserrat_700Bold as Mont_700,
} from '@expo-google-fonts/montserrat';
import '../localization/i18n';
import { Slot, SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider } from 'react-redux';

import { SessionProvider } from '@/context/ctx';
import store from '@/store';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { i18n } = useTranslation();

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

  useEffect(() => {
    i18n.changeLanguage('ru');
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <Provider store={store}>
      <SessionProvider>
        <RootSiblingParent>
          <Slot />
        </RootSiblingParent>
      </SessionProvider>
    </Provider>
  );
};

export default RootLayout;
