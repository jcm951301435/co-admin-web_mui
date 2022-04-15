import React from 'react'
import { List, ListSubheader } from '@mui/material'
import MenuListItem from '@/components/MenuListItem'
import { MenuListProps } from '@/hooks/menu'

const MenuList: React.FC<MenuListProps> = ({
  expand = true,
  menus,
  selectMenuId = '',
  collapseMenu = [''],
  switchCollapseMenu,
}) => {
  const subHeader = expand && <ListSubheader component="div">导航菜单</ListSubheader>

  return (
    <List sx={{ overflow: 'hidden' }} subheader={subHeader}>
      {menus.map((item) => {
        return (
          <MenuListItem
            key={item.id}
            menu={item}
            expand={expand}
            selectMenuId={selectMenuId}
            collapseMenu={collapseMenu}
            switchCollapseMenu={switchCollapseMenu}
          />
        )
      })}
    </List>
  )
}

export default MenuList
