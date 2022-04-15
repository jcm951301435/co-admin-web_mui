import React from 'react'
import { findIcon } from './MuiIcons'
import { SvgIconProps } from '@mui/material/SvgIcon'

export interface CustomizeMaterialIconProps extends SvgIconProps {
  iconName: string | undefined
}

const CustomizeMaterialIcon: React.FC<CustomizeMaterialIconProps> = ({
  iconName,
  ...rest
}) => {
  const MuiIcon = findIcon(iconName)
  return <MuiIcon {...rest} />
}

export default CustomizeMaterialIcon
