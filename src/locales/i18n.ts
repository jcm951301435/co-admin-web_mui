import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { i18nLocacleSupprots } from './locales'
import config from '@/config'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: i18nLocacleSupprots,
    fallbackLng: config.DEFAULT_LANGUAGE,

    // keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
