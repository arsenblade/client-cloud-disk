import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router'
import { privateRoutes, publicRoutes } from './Routes'

const AppRouter = () => {
  const isAuth = useSelector(state => state.user.isAuth)

  return (
    <Routes>
      {!isAuth ? 
        publicRoutes.map(route => <Route key={route.path} path={route.path} element={<route.Component />} />)
      :
        privateRoutes.map(route => <Route key={route.path} path={route.path} element={<route.Component />} />)
      }
    </Routes>
  )
}

export default AppRouter