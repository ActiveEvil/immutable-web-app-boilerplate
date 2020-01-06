import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ROUTES } from '../../Constants'

const Home = lazy(() => import(/* webpackChunkName: "Home", webpackPrefetch: true */ '../../Views/Home'))
const Example = lazy(() => import(/* webpackChunkName: "Example", webpackPrefetch: true */ '../../Views/Example'))
const PageNotFound = lazy(() => import(/* webpackChunkName: "PageNotFound", webpackPrefetch: true */ '../../Views/PageNotFound'))

const withSuspense = (Component: React.FC) => {
  return (props: JSX.IntrinsicAttributes) =>
    <Suspense fallback={<div>loading...</div>}>
      <Component {...props} />
    </Suspense>
}

const Router: React.FC = (): JSX.Element => {
  const routes = [{
    component: Home,
    path: ROUTES.HOME
  }, {
    component: Example,
    path: ROUTES.EXAMPLE
  }]

  return <Switch>
      {routes.map(({ path, component }, index) =>
        <Route key={`${path}_${index}`} exact path={path}>{withSuspense(component)}</Route>
      )}
      <Route component={withSuspense(PageNotFound)} />
  </Switch>
}

export default Router
