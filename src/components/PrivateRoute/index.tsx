import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useRootStore } from '@/store/index'
import { RouteType } from '@/route'
import { info } from '@/api/auth/login'
import process from '@/config/process'

/**
 * 权限路由
 * 1.若 to /login 且已登录 redirect to /
 * 2.若 需登录 且未登录 redirect to/login
 * 3.若包含 redirect 则 redirect to *
 * @param props
 * @returns
 */
const PrivateRoute: React.FC<RouteType> = (props) => {
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const { authStore, mainStore } = useRootStore()
  const { isLogin, setUserInfo } = authStore
  const { switchRouteProgressShow } = mainStore

  const { id, componet: Componet, redirect, noLogin, text, children } = props
  const hasChild = !!(children && children.length > 0)
  const isFinalRoute = !redirect && !hasChild

  useEffect(() => {
    const ac = new AbortController()
    if (isFinalRoute) {
      if (text) {
        let title = text
        if (!title) {
          title = process.SITE_TITLE?.toString() || ''
        }
        document.title = title
      }

      if (isLogin && location.pathname !== '/login') {
        switchRouteProgressShow(true)
        setLoading(true)

        info().then((res) => {
          setUserInfo(res.data)
          switchRouteProgressShow(false)
          setLoading(false)
        })
      }
    }
    return () => {
      ac.abort()
    }
  }, [location])

  let renderComponet = <Navigate key={id} to="/" replace />
  if (redirect) {
    renderComponet = <Navigate key={id} to={redirect} replace />
  }
  if (!noLogin && !isLogin) {
    renderComponet = <Navigate key={id} to="/login" replace />
  }
  if (Componet) {
    renderComponet = loading ? <div /> : <Componet key={id} />
  }

  return renderComponet
}

export default PrivateRoute
