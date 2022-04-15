import enUS from './en-US'
import zhCN from './zh-CN'
import { ResourceLanguage } from 'i18next'
import { enUS as enUSMui, zhCN as zhCNMui, Localization } from '@mui/material/locale'
import { enUS as enUSXDG, zhCN as zhCNXDG } from '@mui/x-data-grid'
import * as enUSDayjs from 'dayjs/locale/es-us'
import * as zhCNDayjs from 'dayjs/locale/zh-cn'

// define locales in system

export type LocaleType = 'en-US' | 'zh-CN'
export type LocalizationXDG = typeof enUSXDG
export type LocalizationDayjs = typeof enUSDayjs

export interface LocaleListType {
  name: string
  i18n: ResourceLanguage
  mui: Localization
  xdg: LocalizationXDG
  dayjs: LocalizationDayjs
}

export interface LocaleListObjectType {
  label: string
  value: LocaleType
}

export const localeList: LocaleListObjectType[] = [
  {
    label: 'English',
    value: 'en-US',
  },
  {
    label: '中文',
    value: 'zh-CN',
  },
]

export const getLocaleTypeFromString = (langStr: string | undefined): LocaleType | undefined => {
  if (!langStr) {
    return undefined
  }
  const localeObj: LocaleListObjectType | undefined = localeList.find((item) => item.value === langStr)
  if (localeObj) {
    return localeObj.value
  }
  return undefined
}

export const i18nLocacleSupprots: Record<LocaleType, ResourceLanguage> = {
  'en-US': {
    translation: enUS,
  },
  'zh-CN': {
    translation: zhCN,
  },
}

export const muiLocacleSupprots: Record<LocaleType, Localization> = {
  'en-US': enUSMui,
  'zh-CN': zhCNMui,
}

export const xdgLocacleSupprots: Record<LocaleType, LocalizationXDG> = {
  'en-US': enUSXDG,
  'zh-CN': zhCNXDG,
}

export const dayjsLocacleSupprots: Record<LocaleType, LocalizationDayjs> = {
  'en-US': enUSDayjs,
  'zh-CN': zhCNDayjs,
}
