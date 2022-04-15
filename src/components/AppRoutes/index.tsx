import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from '@/components/PrivateRoute'
import { RouteType } from '@/route'
import { useAppRoute } from '@/hooks/route'

/**
 * 路由条目
 *
 * @param {*} route
 * @return {*}
 */
const routerItem: React.FC<RouteType> = (route) => {
  const { id, path, index, children } = route
  const hasChild = children && children.length > 0
  return (
    <Route key={id} path={path} index={index} element={<PrivateRoute key={id} {...route} />}>
      {hasChild &&
        children.map((item) => {
          return routerItem(item)
        })}
    </Route>
  )
}

/**
 *
 * 主路由
 * @return {*}
 */
const AppRoutes: React.FC = () => {
  const appRoutes = useAppRoute()
  const routers = appRoutes.map((item) => {
    return routerItem(item)
  })
  return <Routes>{routers}</Routes>
}

export default AppRoutes
