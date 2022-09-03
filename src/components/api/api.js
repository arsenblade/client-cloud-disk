import axios from "axios"

const API_URL = 'http://localhost:5000/api/'

export const axiosPublic = axios.create({
  baseURL: API_URL,
  headers: {
		'Content-Type': 'application/json',
	},
})

export const axiosPrivate = axios.create({
  baseURL: API_URL,
  headers: {
		'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
	},
})

axiosPrivate.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('token')

  if(config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})