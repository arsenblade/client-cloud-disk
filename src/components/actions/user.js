import { setUser } from '../../reducers/userReducer'
import { axiosPrivate, axiosPublic } from '../api/interceptor'

export const registration = async (email, password) => {
  try {
    const response = await axiosPublic.post(`auth/registration`, {
      email,
      password
    })
    alert(response.data.message)
  } catch (e) {
    alert(e.response.data.message)
  }
}

export const login =  (email, password) => {
  return async dispatch => {
      try {
        const response = await axiosPublic.post(`auth/login`, {
            email,
            password
        })
        localStorage.setItem('token', response.data.token)

        dispatch(setUser(response.data.user))
      } catch (e) {
        alert(e.response.data.message)
      }
  }
}

export const auth =  () => {
  return async dispatch => {
      try {
        const response = await axiosPrivate.get(`auth/auth`)
        localStorage.setItem('token', response.data.token)
        dispatch(setUser(response.data.user))
      } catch (e) {
        localStorage.removeItem('token')
      }
  }
}