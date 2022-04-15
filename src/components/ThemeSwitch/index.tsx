import * as React from 'react'
import { UseSwitchProps } from '@mui/base/SwitchUnstyled'
import { useAppTheme } from '@/theme'
import { Switch } from '@mui/material'
import { LightMode as LightModeIcon, DarkMode as DarkModeIcon } from '@mui/icons-material'

const ThemeSwitch: React.FC<UseSwitchProps> = (props) => {
  const { currentThemeDark, switchTheme } = useAppTheme()

  const handleSwitchThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event)
    switchTheme(event.target.checked)
  }

  return (
    <Switch
      checked={currentThemeDark}
      onChange={handleSwitchThemeChange}
      icon={<LightModeIcon sx={{ bgcolor: 'primary.main', borderRadius: 3 }} />}
      checkedIcon={<DarkModeIcon sx={{ bgcolor: 'background.default', borderRadius: 3 }} />}
      inputProps={{ 'aria-label': 'theme switch' }}
    />
  )
}

export default ThemeSwitch
