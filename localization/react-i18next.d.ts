import { defaultNS, resources } from './i18n';

// react-i18next versions lower than 11.11.0
declare module 'react-i18next' {
  type DefaultResources = (typeof resources)['es'];
  interface Resources extends DefaultResources {}
}

// react-i18next versions higher than 11.11.0
declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)['es'];
  }
}
