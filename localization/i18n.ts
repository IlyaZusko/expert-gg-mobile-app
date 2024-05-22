// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// import ns1 from './en/en.json';
// import ns2 from './rus/rus.json';
// const resources = {
//   en: {
//     translation: ns1,
//   },
//   rus: {
//     translation: ns2,
//   },
// };

// i18n
//   .use(initReactI18next) // passes i18n down to react-i18next
//   .init({
//     resources,
//     // lng: 'es',

//     //  keySeparator: false, // we do not use keys in form messages.welcome

//     interpolation: {
//       escapeValue: false, // react already safes from xss
//     },
//   });

// export default i18n;
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ns1 from './en/en.json';
import ns2 from './rus/rus.json';
const resources = {
  en: {
    translation: ns1,
  },
  ru: {
    translation: ns2,
  },
};
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3', //To make it work for Android devices, add this line.
    resources,
    lng: 'ru', // default language to use.
    // if you're using a language detector, do not define the lng option
    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;
