import config from '@/config'
import {
  LocaleType,
  localeList,
  getLocaleTypeFromString,
  muiLocacleSupprots,
  xdgLocacleSupprots,
  dayjsLocacleSupprots,
} from './locales'
import { useRootStore } from '@/store'
import appI18n from './i18n'

/**
 * 获取浏览器语言
 * @returns
 */
const getBrowserLanguage = (): LocaleType | undefined => {
  let browserLanguage = ''
  if (typeof navigator !== 'undefined') {
    // if (navigator.userLanguage) {
    //   browserLanguage = navigator.userLanguage
    // }
    if (navigator.language) {
      browserLanguage = navigator.language
    }
  }
  if (!browserLanguage) {
    console.warn('browser language not found')
  }
  return getLocaleTypeFromString(browserLanguage)
}

/**
 * 获取系统配置默认语言
 * @returns
 */
const getSysDefaultLanguage = () => {
  return config.DEFAULT_LANGUAGE
}

/**
 * 本地化 hooks
 * @returns
 */
export const useAppLocales = () => {
  const { mainStore } = useRootStore()
  const browserLanguage = getBrowserLanguage()
  const sysDefaultLanguage = getSysDefaultLanguage()

  let currentLanguage = mainStore.language
  if (!currentLanguage && browserLanguage) {
    currentLanguage = browserLanguage
  }
  if (!currentLanguage) {
    currentLanguage = sysDefaultLanguage
  }

  const muiLocacle = muiLocacleSupprots[currentLanguage]
  const xdgLocacle = xdgLocacleSupprots[currentLanguage]
  const dayjsLocacle = dayjsLocacleSupprots[currentLanguage]

  const changeLanguage = (language: LocaleType) => {
    appI18n.changeLanguage(language)
    mainStore.setLanguage(language)
  }

  return {
    browserLanguage,
    sysDefaultLanguage,
    currentLanguage,
    muiLocacle,
    xdgLocacle,
    dayjsLocacle,
    localeList,
    changeLanguage,
  }
}
