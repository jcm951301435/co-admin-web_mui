import React from 'react'
import { RoutesType } from '@/route'

export type ChangeMenuFunction = (menuId: string, collapse: boolean) => void

export interface MenuListProps {
  expand: boolean
  menus: RoutesType
  selectMenuId?: string
  collapseMenu?: Array<string>
  switchCollapseMenu: ChangeMenuFunction
}

/**
 * 当前按钮
 * @returns
 */
export const useMenuCollapse = () => {
  // const [collapseMenu, setCollapseMenu] = React.useState<string[]>([''])
  // const { currentRouteIds } = useRoute()
  // // 切换菜单 展开、收缩状态
  // const switchCollapseMenu: ChangeMenuFunction = (menuId: string, collapse: boolean) => {
  //   // console.log({ menuId, collapse })
  //   const menuIndex = collapseMenu.indexOf(menuId)
  //   const hasMenuId = menuIndex !== -1
  //   if (hasMenuId && !collapse) {
  //     setCollapseMenu([])
  //   }
  //   if (!hasMenuId && collapse) {
  //     const addMenuIds: string[] = []
  //     addMenuIds.push(menuId)
  //     setCollapseMenu(addMenuIds)
  //   }
  // }
  // return {
  //   collapseMenu,
  //   setCollapseMenu,
  //   switchCollapseMenu,
  // }
}
