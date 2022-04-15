import { PaletteMode } from '@mui/material'
import { Localization } from '@mui/material/locale'
import { createTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { useRootStore } from '@/store/index'
import { LocalizationXDG } from '@/locales/locales'

import lightOption from './light'
import darkOption from './dark'

const getThemeOption = (themeMode: PaletteMode, locale: Localization, localeXDG: LocalizationXDG) => {
  const options = themeMode === 'dark' ? darkOption : lightOption
  console.log(localeXDG)
  return createTheme(options, locale, localeXDG)
}

export const useAppTheme = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const { mainStore } = useRootStore()
  const { themeType, switchTheme } = mainStore
  const currentTheme: 'dark' | 'light' = themeType ? themeType : prefersDarkMode ? 'dark' : 'light'
  const currentThemeDark = currentTheme === 'dark'
  return { currentTheme, currentThemeDark, switchTheme }
}

export default getThemeOption
