import Layout from '@/components/Layout'
import Home from '@/views/home'

import Login from '@/views/auth/Login'
import NotFound from '@/views/error/NotFound'

import { RoutesType } from './RouteType'

import LazyLodingRouteViews from '@/components/LazyLoading'
import loadable from '@loadable/component'

// const User = LazyLodingRouteViews('@/views/system/user')
// console.log(User)

export const routes: RoutesType = [
  {
    id: 'index',
    path: '/',
    text: '主页',
    componet: Layout,
    hidden: true,
    children: [
      {
        id: 'indexIndex',
        index: true,
        redirect: 'index',
      },
    ],
  },
  {
    id: 'home',
    path: 'index',
    componet: Layout,
    text: '主页',
    icon: 'Home',
    children: [
      {
        id: 'homeIndex',
        index: true,
        componet: Home,
      },
    ],
  },
  {
    id: 'system',
    path: 'system',
    componet: Layout,
    icon: 'Settings',
    text: '系统管理',
    children: [
      {
        id: 'systemIndex',
        index: true,
        redirect: 'user',
      },
      {
        id: 'user',
        path: 'user',
        componet: LazyLodingRouteViews('system/user'),
        icon: 'ManageAccounts',
        text: '用户管理',
      },
      {
        id: 'role',
        path: 'role',
        componet: LazyLodingRouteViews('system/role'),
        icon: 'SupervisorAccount',
        text: '角色管理',
      },
      {
        id: 'permission',
        path: 'permission',
        componet: LazyLodingRouteViews('system/permission'),
        icon: 'DragIndicator',
        text: '权限管理',
      },
      {
        id: 'depart',
        path: 'depart',
        componet: LazyLodingRouteViews('system/depart'),
        icon: 'AlignHorizontalLeft',
        text: '组织架构',
      },
      {
        id: 'dict',
        path: 'dict',
        componet: LazyLodingRouteViews('system/dict'),
        icon: 'Description',
        text: '字典管理',
      },
    ],
  },
  {
    id: 'monitor',
    path: 'monitor',
    componet: Layout,
    icon: 'monitor',
    text: '系统监控',
    children: [
      {
        id: 'monitorIndex',
        index: true,
        redirect: 'online',
      },
      {
        id: 'online',
        path: 'online',
        componet: LazyLodingRouteViews('monitor/online'),
        icon: 'OnlinePrediction',
        text: '在线用户',
      },
      {
        id: 'log',
        path: 'log',
        componet: LazyLodingRouteViews('monitor/log'),
        icon: 'BugReport',
        text: '用户日志',
      },
      {
        id: 'errorLog',
        path: 'errorLog',
        componet: LazyLodingRouteViews('monitor/errorLog'),
        icon: 'Error',
        text: '异常日志',
      },
      {
        id: 'server',
        path: 'server',
        componet: LazyLodingRouteViews('monitor/server'),
        icon: 'Dns',
        text: '服务监控',
      },
      {
        id: 'sql',
        path: 'sql',
        componet: LazyLodingRouteViews('monitor/sql'),
        icon: 'Storage',
        text: 'SQL监控',
      },
    ],
  },
  {
    id: 'users',
    path: 'user',
    componet: Layout,
    hidden: true,
    children: [
      {
        id: 'usersIndex',
        index: true,
        redirect: 'center',
      },
      {
        id: 'center',
        path: 'center',
        componet: LazyLodingRouteViews('auth/center'),
        text: '个人中心',
        hidden: true,
      },
    ],
  },
  {
    id: 'login',
    path: '/login',
    componet: Login,
    noLogin: true,
    text: '登录',
    hidden: true,
  },
  {
    id: 'notFound',
    path: '*',
    componet: NotFound,
    noLogin: true,
    text: '404',
    hidden: true,
  },
]

export default routes
