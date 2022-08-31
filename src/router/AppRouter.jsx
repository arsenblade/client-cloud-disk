import React from 'react'
import { Route, Routes } from 'react-router'
import { publicRoutes } from './Routes'

const AppRouter = () => {
  return (
    <Routes>
      {publicRoutes.map(route => <Route key={route.path} path={route.path} element={<route.Component />} />)}
    </Routes>
  )
}

export default AppRouter