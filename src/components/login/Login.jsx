import React, { useState } from 'react'
import Input from '../../ui/Input/Input'
import { login } from '../actions/user'
import styles from './Login.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentDir } from '../../reducers/fileReducer'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dirStack = useSelector(state => state.files.dirStack)
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.isAuth)

  function handleLogin() {
    dispatch(login(email, password))
    const backDirId = dirStack.pop()
    dispatch(setCurrentDir(backDirId))
  }

  return (
    !isAuth ? 
    <div className={styles.login}>
      <h2 className={styles.header}>Авторизация</h2>
      <Input value={email} setValue={setEmail} type='text' placeholder='Введите адрес электронной почты...'/>
      <Input value={password} setValue={setPassword} type='password' placeholder='Введите пароль...'/>
      <button className={styles.btn} onClick={() => handleLogin()}>Войти</button>
    </div> : null
  )
}

export default Login