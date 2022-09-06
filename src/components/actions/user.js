import { setUser, stopLoading } from '../../reducers/userReducer'
import { MyToast } from '../../ui/MyToast/MyToast'
import { axiosPrivate, axiosPublic } from '../api/interceptor'

export const registration = async (email, password) => {
  try {
    const response = await axiosPublic.post(`auth/registration`, {
      email,
      password
    })
    MyToast('Регистрация успешна', true)
    
  } catch (e) {
    MyToast(e.response.data.message, false)
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
        MyToast(e.response.data.message, false)
      } finally {
        dispatch(stopLoading())
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
      } finally {
        dispatch(stopLoading())
      }
  }
}