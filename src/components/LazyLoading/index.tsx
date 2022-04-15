import React, { lazy, Suspense } from 'react'

const DefaultComponet: React.FC = () => {
  return null
}

const Lazyloading = (importFunc: { (): Promise<unknown>; (): Promise<{ default: React.ComponentType<any> }> }) => {
  const LazyComponent = lazy(importFunc)
  return () => (
    <Suspense fallback={<DefaultComponet />}>
      <LazyComponent />
    </Suspense>
  )
}

const LazyLodingRouteViews = (path: string) => {
  return Lazyloading(() => {
    return new Promise((resolve) => {
      resolve(import(`../../views/${path}/index.tsx`))
    })
  })
}

export default LazyLodingRouteViews
