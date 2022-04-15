import { RoutesType } from '@/route'
import { makeAutoObservable } from 'mobx'
import RootStore from '@/store'
import Cookies from 'js-cookie'
import config from '@/config'
import { LocaleType, getLocaleTypeFromString } from '@/locales/locales'

const cookieLanguageStr = Cookies.get(config.LANGUAGE_KEY)
const cookieLanguage = getLocaleTypeFromString(cookieLanguageStr)
const cookieTheme: 'dark' | 'light' = Cookies.get(config.THEME_KEY) === 'dark' ? 'dark' : 'light'

class MainStore {
  public menuOpen = true
  public language: LocaleType | undefined = cookieLanguage
  public themeType: 'dark' | 'light' = cookieTheme
  public routeProgressShow = false
  public currentRoute: RoutesType = []

  public rootStore

  public get themeDark(): boolean {
    return this.themeType === 'dark'
  }

  public constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false })
    this.rootStore = rootStore
  }

  public switchMenu = () => {
    this.menuOpen = !this.menuOpen
  }

  public setLanguage = (language: LocaleType) => {
    Cookies.set(config.LANGUAGE_KEY, language)
    this.language = language
  }

  public setTheme = (themeType: 'dark' | 'light') => {
    this.themeType = themeType
    Cookies.set(config.THEME_KEY, themeType)
  }

  public switchTheme = (themeDark: boolean) => {
    this.setTheme(themeDark ? 'dark' : 'light')
  }

  public switchRouteProgressShow = (routeProgressShow: boolean) => {
    this.routeProgressShow = routeProgressShow
  }

  public setCurrentRoute = (currentRoute: RoutesType) => {
    this.currentRoute = currentRoute
  }
}

export default MainStore
