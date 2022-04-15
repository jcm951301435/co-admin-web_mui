import { LocaleType } from '@/locales/locales'

const defaultLanguage: LocaleType = 'en-US'

const config = {
  /**
   * 默认语言
   */
  DEFAULT_LANGUAGE: defaultLanguage,

  /**
   *
   */
  WEB_SITE_NAME: 'Your Website',

  /**
   *
   */
  WEB_SITE_URL: 'https://mui.com/',

  /**
   * 超时时间 默认 2min
   */
  TIME_OUT: 3600000,

  /**
   *
   */
  TOKEN_COOKIE_EXPIRES: 1,

  /**
   *
   */
  TOKEN_KEY: 'MANGER_SYSTEM_TOEKN',

  LANGUAGE_KEY: 'MANGER_SYSTEM_LANGUAGE',

  THEME_KEY: 'MANGER_SYSTEM_THEME',

  DEFAULT_LOGIN_DATA: {
    username: 'admin',
    password: '123456',
  },
}

export default config
