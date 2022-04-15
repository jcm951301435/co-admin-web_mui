import SvgIcon from '@mui/material/SvgIcon'
import {
  Menu,
  Send,
  Home,
  Settings,
  ManageAccounts,
  SupervisorAccount,
  Groups,
  AlignHorizontalLeft,
  BlurLinear,
  Monitor,
  OnlinePrediction,
  Error,
  Description,
  BugReport,
  Storage,
  Dns,
  DragIndicator,
} from '@mui/icons-material'

type SvgIconComponent = typeof SvgIcon

type Record<K extends string, T> = {
  [P in K]: T
}

const MuiIcons: Record<string, SvgIconComponent> = {
  Menu,
  Send,
  Home,
  Settings,
  ManageAccounts,
  SupervisorAccount,
  Groups,
  AlignHorizontalLeft,
  BlurLinear,
  Monitor,
  OnlinePrediction,
  Error,
  Description,
  BugReport,
  Storage,
  Dns,
  DragIndicator,
}

export const findIcon = (iconName: string | undefined) => {
  let result = Object.keys(MuiIcons).find((k) => k === iconName)
  result = result || 'Menu'
  return MuiIcons[result]
}

export default MuiIcons
