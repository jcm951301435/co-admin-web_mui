import { useLocation, matchRoutes, RouteMatch, useMatch } from 'react-router-dom'
import { routes, RoutesType, RouteType } from '@/route'

const findRouteByPath = (path: string, routesTemp: RoutesType): RouteType | undefined => {
  const findTemp: RouteType | undefined = routesTemp.find((item) => {
    return item.path === path
  })
  if (!findTemp) {
    return undefined
  }
  return { ...findTemp }
}

const findRoutesByPaths = (paths: string[], routesTemp: RoutesType) => {
  const findRoutes: RoutesType = []
  const pathLevel = paths.length
  const findRoute = findRouteByPath(paths[0], routesTemp)
  if (!findRoute) {
    return undefined
  }
  let findTemp = findRoute
  findRoutes.push(findRoute)
  let i = 1
  while (i < pathLevel) {
    if (!findTemp) {
      break
    }
    const children = findTemp.children
    if (!children) {
      break
    }
    const findChild = findRouteByPath(paths[i], children)
    if (!findChild) {
      break
    }
    findRoutes.push(findChild)
    findTemp = findChild
    i++
  }
  return findRoutes
}

export const useCurrentRoute = () => {
  const appRoutes = useAppRoute()
  const location = useLocation()
  let afterDealPath = location.pathname
  if (afterDealPath.indexOf('?') !== -1) {
    afterDealPath = afterDealPath.substr(0, afterDealPath.indexOf('?'))
  }
  const pathnames = afterDealPath.split('/').filter((item) => item.length > 0)
  let resultRoute = findRoutesByPaths(pathnames, appRoutes)
  if (!resultRoute) {
    return [{id: ''}]
  }
  return resultRoute
}

export const useAppRoute = () => {
  return routes
}
