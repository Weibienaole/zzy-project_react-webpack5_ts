import { Suspense } from 'react'
import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

/*
  route = [
    {
      path: '页面路径',
      module: '',
      exact: '如果 children 有值，则为false，反之true',
      childrens:[
        ...同上
      ]
    }
  ]

 */

// const route = [
//   {
//     path: '/',
//     module: React.lazy(() => import('@/page/index'))
//   },
//   {
//     path: '/next',
//     module: React.lazy(() => import('@/page/index'))
//   }
// ]
interface IRoute {
  path: string,
  module: string,
  childrens?: IRoute[]
}
interface IRouteDom {
  path: string,
  module: React.LazyExoticComponent<any>
  // module: React.LazyExoticComponent<React.ComponentType<any>>
  // module: React.ExoticComponent<any>,
  childrens?: IRouteDom[]
}


const route: IRoute[] = [
  {
    path: '/',
    module: 'page/index'
  },
  {
    path: '/management',
    module: 'page/management'
  }
]

function getModule(routes: IRoute[]) {
  return routes.map((item: IRoute): IRouteDom => ({
    path: item.path,
    module: React.lazy(() => import(`@/${item.module}`))
  }))
}

function Routes(route: IRouteDom[]): React.ReactNode[] {
  return route.map(({ path, childrens = [], module }, index) => {
    const Component = module
    return (
      <Route
        key={'Route' + index}
        path={path}
        exact={childrens.length === 0}
        render={(props) => (
          <Component {...props}>
            {childrens.length > 0 && Routes(childrens)}
          </Component>
        )}
      ></Route>
    )
  })
}

function router() {
  return (
    <HashRouter>
      <Suspense fallback={<div>loading...</div>}>
        <Switch>{Routes(getModule(route))}</Switch>
      </Suspense>
    </HashRouter>
  )
}

export default router
