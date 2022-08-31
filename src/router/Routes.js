import Registration from "../components/registration/Registration";

const APP_ROUTES = {
  REGISTRATION_ROUTE: '/registration',
  LOGIN_ROUTE: '/login',
  MAIN_ROUTE: '/'
}

export const publicRoutes = [
  {
    path: APP_ROUTES.REGISTRATION_ROUTE,
    Component: Registration
  },
]