import { createI18n } from 'vue-i18n';

import pt from './locales/pt.json';
import en from './locales/en.json';

const messages = {
  pt,
  en,
};

const i18n = createI18n({
  legacy: false, // necessário para Composition API
  locale: localStorage.getItem('lang') || 'pt',
  fallbackLocale: 'pt',
  messages,
});

export default i18n;
