import React from 'react'
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material'
import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import CustomizeMaterialIcon, { CustomizeMaterialIconProps } from '@/components/MaterialIcon'
import { RouteType } from '@/route'
import { useNavigate } from 'react-router-dom'
import { ChangeMenuFunction } from '@/hooks/menu'

interface MenuListItemProps {
  menu: RouteType
  expand?: boolean
  pPath?: string
  selectMenuId?: string
  collapseMenu?: Array<string>
  switchCollapseMenu: ChangeMenuFunction
}

interface MenuListItemNoChildProps {
  expand: boolean
  menu: RouteType
  pPath?: string
  selectMenuId?: string
}

interface MenuListItemHasChildProps {
  menu: RouteType
  expand?: boolean
  selectMenuId?: string
  collapseMenu?: Array<string>
  switchCollapseMenu: ChangeMenuFunction
}

const MenuIcon: React.FC<CustomizeMaterialIconProps> = ({ iconName, ...rest }) => {
  return <CustomizeMaterialIcon iconName={iconName} {...rest} />
}

/**
 * 无下级菜单
 *
 * @param {*} {
 *   expand,
 *   menu,
 *   pMenu,
 * }
 * @return {*}
 */
const MenuListItemNoChild: React.FC<MenuListItemNoChildProps> = ({ expand, menu, pPath, selectMenuId = '' }) => {
  const navigate = useNavigate()
  const { icon, text, level, path, id } = menu

  const fullPath = (pPath || '') + '/' + path
  let itemPaddingLeft = 2
  if (level && level > 0) {
    itemPaddingLeft = 4 * level + 2
  }

  const handleToPath = (path: string) => {
    navigate(path)
  }

  const selected = selectMenuId === id

  return (
    <ListItemButton
      selected={selected}
      sx={{ pl: itemPaddingLeft, fontSize: 5 }}
      onClick={() => {
        handleToPath(fullPath)
      }}
    >
      <ListItemIcon>
        <MenuIcon fontSize={expand ? 'small' : 'medium'} iconName={icon} />
      </ListItemIcon>
      {expand && <ListItemText primary={text} />}
    </ListItemButton>
  )
}

/**
 * 有下级菜单
 *
 * @param {*} {
 *   menu,
 *   expand = true,
 *   selectPath = '',
 *   collapseMenus = [''],
 *   changeCollapaseMenu,
 * }
 * @return {*}
 */
const MenuListItemHasChild: React.FC<MenuListItemHasChildProps> = ({
  menu,
  expand = true,
  selectMenuId = '',
  collapseMenu = [''],
  switchCollapseMenu,
}) => {
  const { icon, children, text, level, id, path } = menu

  let levelValue = 0
  let itemPaddingLeft = { pl: 2 }
  if (level && level > 0) {
    levelValue = level
    itemPaddingLeft = { pl: 4 * level + 2 }
  }
  const subMenuOpen = collapseMenu.indexOf(id) !== -1

  const hasChild = children && children.length > 0
  const pPath = path ? '/' + path : undefined

  return (
    <Box>
      <ListItemButton
        sx={itemPaddingLeft}
        onClick={() => {
          switchCollapseMenu(id, !subMenuOpen)
        }}
      >
        <ListItemIcon>
          <MenuIcon fontSize={expand ? 'small' : 'medium'} iconName={icon} />
        </ListItemIcon>
        {expand && <ListItemText primary={text} />}
        {expand && (subMenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
      </ListItemButton>
      {expand ? (
        <Collapse in={subMenuOpen} timeout="auto">
          <List component="div" disablePadding>
            {hasChild &&
              children.map((item) => {
                item.level = levelValue + 1
                return (
                  <MenuListItem
                    key={item.id}
                    menu={item}
                    expand={expand}
                    pPath={pPath}
                    selectMenuId={selectMenuId}
                    collapseMenu={collapseMenu}
                    switchCollapseMenu={switchCollapseMenu}
                  />
                )
              })}
          </List>
        </Collapse>
      ) : (
        ''
      )}
    </Box>
  )
}

/**
 * 菜单按钮
 * @param props
 * @returns
 */
const MenuListItem: React.FC<MenuListItemProps> = ({
  menu,
  expand = true,
  pPath = undefined,
  collapseMenu = [''],
  selectMenuId = '',
  switchCollapseMenu,
}) => {
  const { children, hidden } = menu
  const hasChild = children && children.length > 0

  if (hidden) {
    return null
  }

  // 无下级菜单
  if (!hasChild) {
    return <MenuListItemNoChild expand={expand} menu={menu} pPath={pPath} selectMenuId={selectMenuId} />
  }

  // 有下级菜单
  return (
    <MenuListItemHasChild
      expand={expand}
      menu={menu}
      selectMenuId={selectMenuId}
      collapseMenu={collapseMenu}
      switchCollapseMenu={switchCollapseMenu}
    />
  )
}

export default MenuListItem
