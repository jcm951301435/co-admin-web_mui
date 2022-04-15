import React, { useContext } from 'react'
import AuthStore from '@/store/auth'
import MainStore from '@/store/main'

class RootStore {
  public authStore
  public mainStore

  public constructor() {
    this.authStore = new AuthStore(this)
    this.mainStore = new MainStore(this)
  }
}

export const store = new RootStore()

export const RootStoreContext = React.createContext<RootStore>(store)

export const useRootStore = () => {
  return useContext(RootStoreContext)
}

export default RootStore
