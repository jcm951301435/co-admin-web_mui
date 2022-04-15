import React from 'react'
import { observer } from 'mobx-react-lite'
import {
  Box,
  TextField,
  InputAdornment,
  Toolbar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Divider,
} from '@mui/material'
import AppBar from '@mui/material/AppBar'
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  AccountBox as AccountBoxIcon,
  ExitToApp as ExitToAppIcon,
  Dashboard as DashboardIcon,
  Search as SearchIcon,
} from '@mui/icons-material'
import { useRootStore } from '@/store/index'
import { useTheme } from '@mui/material/styles'
import TranslateButton from '@/components/TranslateButton'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ThemeSwitch from '@/components/ThemeSwitch'
import { useTranslation } from 'react-i18next'
import { logout } from '@/api/auth/login'
import { useNavigate } from 'react-router-dom'
import { useAppTheme } from '@/theme'
import process from '@/config/process'

const systemTitle = process.SITE_TITLE

const SearchInput: React.FC<any> = () => {
  const theme = useTheme()

  return (
    <TextField
      color="info"
      variant="standard"
      sx={{
        '& .MuiInputBase-root': {
          color: 'white',
        },
        '& .MuiInputAdornment-root': {
          color: 'white',
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  )
}

/**
 * 账户菜单
 * @returns
 */
const AccountMenu: React.FC<any> = observer((props) => {
  const { t } = useTranslation()
  const { authStore } = useRootStore()
  const navigate = useNavigate()
  const { anchorEl, setAnchorEl } = props
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = () => {
    logout().then(() => {
      authStore.cleanToken()
      authStore.cleanUserInfo()
      setAnchorEl(null)
      navigate('/', { replace: true })
    })
    setAnchorEl(null)
  }
  const handleUserCenter = () => {
    navigate('/user/center', { replace: true })
    setAnchorEl(null)
  }
  const isMenuOpen = Boolean(anchorEl)

  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <MenuItem onClick={handleUserCenter} disableRipple>
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        {t('button.userCenter')}
      </MenuItem>
      <MenuItem onClick={handleLogout} disableRipple>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        {t('button.logout')}
      </MenuItem>
    </Menu>
  )
})

/**
 * 顶部标题
 * @returns
 */
const Header: React.FC = observer(() => {
  const { mainStore, authStore } = useRootStore()
  const { menuOpen, switchMenu } = mainStore
  const { userInfo } = authStore
  const { currentThemeDark, switchTheme } = useAppTheme()
  const theme = useTheme()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSwitchThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switchTheme(event.target.checked)
  }

  const menuWidthSpaceNum = menuOpen ? 28 : 7

  const title = menuOpen && (
    <Typography sx={{ fontWeight: 700, pl: 2 }} variant="h6">
      {systemTitle}
    </Typography>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        sx={{
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            pr: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: theme.spacing(menuWidthSpaceNum),
              pl: 2,
            }}
          >
            <IconButton size="large" color="inherit" aria-label="logo" sx={{ p: 0 }}>
              <DashboardIcon />
            </IconButton>
            {title}
          </Box>
          <Divider orientation="vertical" flexItem />

          <IconButton size="large" color="inherit" aria-label="open drawer" onClick={switchMenu}>
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          <SearchInput />

          <IconButton size="large" aria-label="show notify" color="inherit">
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Typography sx={{ pl: 2 }} variant="subtitle1">
            {userInfo.nickName}
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
          <TranslateButton />
          <ThemeSwitch />
          <AccountMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </Toolbar>
      </AppBar>
    </Box>
  )
})

export default Header
