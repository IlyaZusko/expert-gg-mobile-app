import {
  useFonts,
  Montserrat_400Regular as Mont_400,
  Montserrat_500Medium as Mont_500,
  Montserrat_600SemiBold as Mont_600,
  Montserrat_700Bold as Mont_700,
} from '@expo-google-fonts/montserrat';
import '../localization/i18n';
import { Slot, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast, { BaseToast, BaseToastProps } from 'react-native-toast-message';
import { Provider } from 'react-redux';

import { SessionProvider } from '@/context/ctx';
import {
  ACCENT_GOLD_COLOR,
  COVER_COLOR,
  GREY_TEXT_COLOR,
  WHITE_COLOR,
} from '@/helpers/constants/Colors';
import store from '@/store';

SplashScreen.preventAutoHideAsync();

const toastConfig = {
  success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: ACCENT_GOLD_COLOR,
        backgroundColor: COVER_COLOR,
        width: '92%',
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontFamily: 'Mont_500',
        fontSize: 14,
        color: WHITE_COLOR,
      }}
      text2Style={{
        fontFamily: 'Mont_400',
        fontSize: 10,
        color: GREY_TEXT_COLOR,
      }}
    />
  ),
};

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
          <StatusBar style="light" />
          <Toast config={toastConfig} bottomOffset={110} position="bottom" />
        </RootSiblingParent>
      </SessionProvider>
    </Provider>
  );
};

export default RootLayout;
