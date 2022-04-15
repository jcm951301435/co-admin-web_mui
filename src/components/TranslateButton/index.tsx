import React from 'react'
import { useRootStore } from '@/store/index'

import { IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material'
import {
  Translate as TranslateIcon,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
} from '@mui/icons-material'
import { useAppLocales } from '@/locales'
import { observer } from 'mobx-react-lite'
import { PopoverProps } from '@mui/material/Popover'

interface TranslateMenuProps {
  anchorEl?: PopoverProps['anchorEl']
  closeMenu: () => void
}

/**
 * 翻译菜单
 * @param props
 * @returns
 */
const TranslateMenu: React.FC<TranslateMenuProps> = observer((props) => {
  const { currentLanguage, localeList, changeLanguage } = useAppLocales()

  const { anchorEl, closeMenu } = props
  const selectLanguage = (langeuage: { label?: string; value: any }) => {
    changeLanguage(langeuage.value)
    closeMenu()
  }
  const langeuageItems = localeList.map((localeTemp) => (
    <MenuItem key={localeTemp.value} onClick={() => selectLanguage(localeTemp)}>
      <ListItemIcon>
        {localeTemp.value === currentLanguage ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
      </ListItemIcon>
      {localeTemp.label}
    </MenuItem>
  ))

  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={closeMenu}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      {langeuageItems}
    </Menu>
  )
})

/**
 * 翻译按钮
 * @param props
 * @returns
 */
const TranslateButton: React.FC = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={handleClick}
      >
        <TranslateIcon />
      </IconButton>
      <TranslateMenu anchorEl={anchorEl} closeMenu={handleClose} />
    </>
  )
}

export default TranslateButton
