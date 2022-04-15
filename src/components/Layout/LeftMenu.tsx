import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Theme, CSSObject, useTheme } from '@mui/material/styles'
import { Drawer, Divider, Toolbar } from '@mui/material'
import { useRootStore } from '@/store/index'
import { getMenusAfterPermission } from '@/utils/permission'
import MenuList from '@/components/MenuList'
import { useCurrentRoute } from '@/hooks/route'

const menuWidthSpaceNumOpen = 28
const menuWidthSpaceNumClose = 7

/**
 * 左侧菜单
 * @returns
 */
const LeftMenu: React.FC = observer(() => {
  const currentRoute = useCurrentRoute()
  const currentRouteId: string[] = currentRoute?.map((item) => item.id)
  let selectMenuId = ''
  let collapseMenuId: string[] = ['']
  if (currentRouteId.length > 0) {
    selectMenuId = currentRouteId[currentRouteId.length - 1]
    if (currentRouteId.length > 1) {
      collapseMenuId = currentRouteId.slice(0, currentRouteId.length - 1)
    } else {
      collapseMenuId = currentRouteId.slice(0, currentRouteId.length)
    }
  }

  const [collapseMenu, setCollapseMenu] = useState(collapseMenuId)
  const { mainStore, authStore } = useRootStore()
  const theme = useTheme()
  const { menuOpen } = mainStore
  const { userPermission } = authStore
  const routePermission = getMenusAfterPermission(userPermission)

  const switchCollapseMenu = (menuId: string, collapse: boolean) => {
    const menuIndex = collapseMenu.indexOf(menuId)
    const hasMenuId = menuIndex !== -1

    if (hasMenuId && !collapse) {
      const newMenuIds: string[] = []
      setCollapseMenu(newMenuIds)
    }
    if (!hasMenuId && collapse) {
      const newMenuIds: string[] = []
      newMenuIds.push(menuId)
      setCollapseMenu(newMenuIds)
    }
  }

  const DrawerMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: menuOpen ? theme.spacing(menuWidthSpaceNumOpen) : `calc(${theme.spacing(menuWidthSpaceNumClose)} + 1px)`,
  })

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: theme.spacing(menuWidthSpaceNumOpen),
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...DrawerMixin(theme),
        '& .MuiDrawer-paper': DrawerMixin(theme),
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.spacing(0, 1),
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.info.main,
          overflow: 'hidden',
          width: menuOpen
            ? theme.spacing(menuWidthSpaceNumOpen)
            : `calc(${theme.spacing(menuWidthSpaceNumClose)} + 1px)`,
        }}
      />
      <Divider />

      <MenuList
        expand={menuOpen}
        menus={routePermission}
        selectMenuId={selectMenuId}
        collapseMenu={collapseMenu}
        switchCollapseMenu={switchCollapseMenu}
      />
    </Drawer>
  )
})

export default LeftMenu
