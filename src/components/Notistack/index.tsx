import React from 'react'
import { useSnackbar, VariantType, WithSnackbarProps, SnackbarKey } from 'notistack'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

let useSnackbarRef: WithSnackbarProps
const SnackbarUtilsConfigurator: React.FC = () => {
  useSnackbarRef = useSnackbar()
  return null
}

const action: React.FC<SnackbarKey> = (key) => (
  <IconButton
    size="small"
    aria-label="close"
    color="inherit"
    onClick={() => {
      useSnackbarRef.closeSnackbar(key)
    }}
  >
    <CloseIcon fontSize="small" />
  </IconButton>
)

export const notistack = {
  success(msg: string) {
    this.toast(msg, 'success')
  },
  warning(msg: string) {
    this.toast(msg, 'warning')
  },
  info(msg: string) {
    this.toast(msg, 'info')
  },
  error(msg: string) {
    this.toast(msg, 'error')
  },
  toast(msg: string, variant: VariantType = 'default') {
    useSnackbarRef.enqueueSnackbar(msg, { variant, action })
  },
}

export default SnackbarUtilsConfigurator
