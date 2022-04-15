import { routes, RoutesType } from '@/route'

const adminPermission = 'admin'

/**
 * 是否包含此权限
 * @param checkPermission
 * @param permission
 * @returns
 */
export const hasPermission = (checkPermission: string, permission: Array<string>) => {
  return permission.indexOf(checkPermission) !== -1
}

/**
 * 是否是管理员
 * @param permission
 * @returns
 */
export const checkIsAdmin = (permission: Array<string>) => {
  return hasPermission(adminPermission, permission)
}

/**
 * 获取验证后的权限
 * @param permission
 * @returns
 */
export const getMenusAfterPermission = (permission: Array<string>) => {
  const isAdmin = checkIsAdmin(permission)

  const menusFilter = (menus: RoutesType) => {
    const menusAfterFilter: RoutesType = []
    menus.forEach((item) => {
      if (item.hidden === true || item.index === true) {
        return
      }
      const menuPermission = item.permission
      if (menuPermission && !isAdmin && !hasPermission(menuPermission, permission)) {
        return
      }

      const itemCopy = { ...item }
      const children = item.children
      if (children instanceof Array && children.length >= 0) {
        const childrenAfterFilter = menusFilter(children)
        itemCopy.children = childrenAfterFilter
      }
      menusAfterFilter.push(itemCopy)
    })
    return menusAfterFilter
  }

  const filterMenus = menusFilter(routes)
  return filterMenus
}
