import React from 'react'
import { observer } from 'mobx-react-lite'
import { useLocation, Link as RouterLink, Outlet } from 'react-router-dom'
import { Box, Toolbar, Breadcrumbs, Typography } from '@mui/material'
import Link, { LinkProps } from '@mui/material/Link'
import { useCurrentRoute } from '@/hooks/route'

import Header from './Header'
import LeftMenu from './LeftMenu'

const findRouterLevels = (pathname: string) => {
  const routers = pathname.split('/')
  const result: string[] = []
  if (routers && routers.length > 0) {
    routers.forEach((item) => {
      if (item) {
        result.push(item)
      }
    })
  }
  return result
}

interface LinkRouterProps extends LinkProps {
  to: string
  replace?: boolean
}

const LinkRouter: React.FC<LinkRouterProps> = (props) => {
  return <Link {...props} component={RouterLink as any} />
}

/**
 * 布局组件
 * @returns
 */
const Layout: React.FC = observer(() => {
  const currentRoute = useCurrentRoute()

  let cPath = ''
  const BreadcrumbsList = currentRoute.map((item, index) => {
    cPath = cPath + '/' + item.path
    if (index === currentRoute.length - 1) {
      return (
        <Typography key={item.id} color="text.primary">
          {item.text}
        </Typography>
      )
    }
    return (
      <LinkRouter key={item.id} underline="hover" color="inherit" to={cPath}>
        {item.text}
      </LinkRouter>
    )
  })

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <LeftMenu />
      <Box component="main" sx={{ flexGrow: 1, pl: 4, pr: 4 }}>
        <Toolbar />
        <Box sx={{ pt: 2 }}>
          <Breadcrumbs aria-label="breadcrumb">{BreadcrumbsList}</Breadcrumbs>
          <Box sx={{ pt: 2 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  )
})

export default Layout
