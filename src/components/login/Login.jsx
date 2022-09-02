import React, { useState } from 'react'
import Input from '../../ui/Input/Input'
import { login } from '../actions/user'
import styles from './Login.module.scss'
import { useDispatch } from 'react-redux'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  return (
    <div className={styles.login}>
      <h2 className={styles.header}>Авторизация</h2>
      <Input value={email} setValue={setEmail} type='text' placeholder='Введите адрес электронной почты...'/>
      <Input value={password} setValue={setPassword} type='password' placeholder='Введите пароль...'/>
      <button className={styles.btn} onClick={() => dispatch(login(email, password))}>Войти</button>
    </div>
  )
}

export default Login