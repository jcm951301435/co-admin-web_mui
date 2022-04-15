import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const NotFound: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const handleToIndex = () => {
    navigate('/', { replace: true })
  }
  return (
    <Box
      sx={{
        mt: 1,
        marginTop: 16,
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" component="div" sx={{ letterSpacing: 6, fontSize: 180, fontWeight: 300 }}>
        404
      </Typography>
      <Typography variant="h1" component="div" sx={{ fontSize: 36, fontWeight: 300 }}>
        {t('error.errorMsg404')}
      </Typography>
      <Button variant="contained" sx={{ fontSize: 14, mt: 2 }} onClick={handleToIndex}>
        {t('error.errorMsgBackHome')}
      </Button>
    </Box>
  )
}

export default NotFound
