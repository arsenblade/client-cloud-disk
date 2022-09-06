const SET_USER = 'SET_USER';
const LOGOUT = 'LOGOUT';
const LOADING = 'LOADING';


const defaultState = {
  currentUser: {},
  isAuth: false,
  isLoading: true,
}

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USER: 
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
        isLoading: false
      }
    case LOGOUT: 
      localStorage.removeItem('token')
      return {
        ...state,
        currentUser: {},
        isAuth: false,
        isLoading: false
      }
      case LOADING: 
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}

export const setUser = user => ({type: SET_USER, payload: user})
export const logout = () => ({type: LOGOUT})
export const stopLoading = () => ({type: LOADING})