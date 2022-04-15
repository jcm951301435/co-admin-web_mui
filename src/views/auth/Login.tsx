import React, { useEffect, useState } from 'react'
import config from '@/config'
import { useTranslation } from 'react-i18next'
import { login } from '@/api/auth/login'
import { useForm } from 'react-hook-form'
import { useRootStore } from '@/store/index'
import { useNavigate } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'
import { Avatar, Box, TextField, Link, Toolbar, Container, Card, CardContent } from '@mui/material'
import Typography, { TypographyProps } from '@mui/material/Typography'

import { AccountCircle as AccountCircleIcon, Login as LoginIcon } from '@mui/icons-material'
import TranslateButton from '@/components/TranslateButton'
import { LoginData } from '@/model/auth'
import process from '@/config/process'
import ThemeSwitch from '@/components/ThemeSwitch'

const sysTitle = process.SITE_TITLE

/**
 * 底部 Copyright
 * @param props
 * @returns
 */
const Copyright: React.FC<TypographyProps> = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href={config.WEB_SITE_URL}>
        {config.WEB_SITE_NAME}
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  )
}

/**
 * 首行 toolbar
 * @returns
 */
const Header: React.FC = () => {
  return (
    <Toolbar>
      <Typography component="div" sx={{ flexGrow: 1 }} />
      <TranslateButton />
      <ThemeSwitch />
    </Toolbar>
  )
}

/**
 * 登录表单
 * @returns
 */
const LoginForm: React.FC = () => {
  const { t } = useTranslation()
  const { authStore } = useRootStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (authStore.isLogin) {
      navigate('/', { replace: true })
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    mode: 'all',
    defaultValues: config.DEFAULT_LOGIN_DATA,
  })

  const onSubmit = handleSubmit((data: LoginData) => {
    setLoading(true)
    login(data)
      .then((res) => {
        const { token } = res.data
        authStore.updateToken(token)
        setLoading(false)
        navigate('/', { replace: true })
      })
      .catch(() => {
        setLoading(false)
      })
  })

  return (
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ ml: 2, mr: 2 }}>
      <TextField
        required
        margin="normal"
        fullWidth
        label={t('login.username')}
        autoComplete="username"
        autoFocus
        variant="standard"
        error={!!errors.username}
        helperText={errors.username && t(errors.username.message || '')}
        {...register('username', {
          required: {
            value: true,
            message: 'login.usernameValidRequireMessage',
          },
        })}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        variant="standard"
        label={t('login.password')}
        type="password"
        autoComplete="current-password"
        error={!!errors.password}
        helperText={errors.password && t(errors.password.message || '')}
        {...register('password', {
          required: {
            value: true,
            message: 'login.passwordValidRequireMessage',
          },
        })}
      />
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1 }} />
        <LoadingButton
          type="submit"
          loading={loading}
          loadingPosition="start"
          startIcon={<LoginIcon />}
          sx={{
            mt: 2,
            fontSize: 14,
            letterSpacing: 4,
            fontWeight: 600,
          }}
        >
          {t('login.loginButton')}
        </LoadingButton>
      </Box>
    </Box>
  )
}

/**
 * 登录界面
 * @returns
 */
const LoginView: React.FC = () => {
  return (
    <Box>
      <Header />
      <Box sx={{ pt: 20 }}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            p: 2,
            pb: 20,
            bgcolor: 'primary.main',
            position: 'relative',
            height: 200,
          }}
        >
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <Card sx={{ borderRadius: 0, boxShadow: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  pt: 6,
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <AccountCircleIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  {sysTitle}
                </Typography>
              </Box>
              <CardContent sx={{ pt: 6, mb: 2 }}>
                <LoginForm />
              </CardContent>
            </Card>
          </Box>
          <Copyright sx={{ mt: 2 }} />
        </Container>
      </Box>
    </Box>
  )
}

export default LoginView
