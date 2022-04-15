import React, { useEffect } from 'react'
import { ThemeProvider, useTheme } from '@mui/material/styles'
import { LinearProgress, CssBaseline } from '@mui/material'
import '@mui/lab/themeAugmentation'

import { useRootStore, store, RootStoreContext } from '@/store/index'
import { observer } from 'mobx-react-lite'
import { useAppLocales } from '@/locales'

import getThemeOption, { useAppTheme } from '@/theme'
import { SnackbarProvider } from 'notistack'
import AppRoutes from '@/components/AppRoutes'
import Notistack from '@/components/Notistack'

import { BrowserRouter } from 'react-router-dom'

const RouteLinearProgress: React.FC = observer(() => {
  const { mainStore } = useRootStore()
  const currentMuiTheme = useTheme()
  const { routeProgressShow } = mainStore
  if (routeProgressShow) {
    return (
      <LinearProgress
        sx={{
          zIndex: currentMuiTheme.zIndex.drawer + 2,
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
        }}
        color="success"
      />
    )
  }
  return null
})

const App: React.FC = observer(() => {
  const { currentTheme } = useAppTheme()
  const { currentLanguage, muiLocacle, xdgLocacle, changeLanguage } = useAppLocales()

  const muiTheme = React.useMemo(() => {
    const option = getThemeOption(currentTheme, muiLocacle, xdgLocacle)
    return option
  }, [currentTheme, muiLocacle, xdgLocacle])

  useEffect(() => {
    changeLanguage(currentLanguage)
  }, [])

  return (
    <BrowserRouter>
      <RootStoreContext.Provider value={store}>
        <ThemeProvider theme={muiTheme}>
          <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Notistack />
            <CssBaseline />
            <RouteLinearProgress />
            <AppRoutes />
          </SnackbarProvider>
        </ThemeProvider>
      </RootStoreContext.Provider>
    </BrowserRouter>
  )
})

export default App
