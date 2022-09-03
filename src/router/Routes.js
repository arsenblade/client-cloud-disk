import Disk from "../components/disk/Disk";
import Login from "../components/login/Login";
import Registration from "../components/registration/Registration";

const APP_ROUTES = {
  REGISTRATION_ROUTE: '/registration',
  LOGIN_ROUTE: '/login',
  DISK_ROUTE: '/',
  MAIN_ROUTE: '/',
  REDIRECT: '*'
}

export const publicRoutes = [
  {
    path: APP_ROUTES.REGISTRATION_ROUTE,
    Component: Registration
  },
  {
    path: APP_ROUTES.LOGIN_ROUTE,
    Component: Login
  },
  {
    path: APP_ROUTES.REDIRECT,
    Component: Login
  },
]

export const privateRoutes = [
  {
    path: APP_ROUTES.DISK_ROUTE,
    Component: Disk
  },
  {
    path: APP_ROUTES.REDIRECT,
    Component: Disk
  },
]
