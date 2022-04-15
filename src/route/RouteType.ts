import React from 'react'

export interface RouteType {
  id: string
  path?: string
  componet?: React.FC
  noLogin?: boolean
  redirect?: string
  children?: RoutesType
  index?: boolean
  text?: string
  icon?: string
  permission?: string
  hidden?: boolean
  level?: number
}

export type RoutesType = Array<RouteType>

export interface RouteTypeWithParent extends RouteType {
  parent: RouteType
}

export type RouteTypesWithParent = Array<RouteTypeWithParent>
