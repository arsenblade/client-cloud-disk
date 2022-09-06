import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Input from '../../ui/Input/Input'
import { registration } from '../actions/user'
import styles from './Registration.module.scss'

const Registration = () => {
  const [email, setEmail] = useState('')
  const isAuth = useSelector(state => state.user.isAuth)
  const [password, setPassword] = useState('')

  return (
    !isAuth &&
    <div className={styles.registration}>
      <h2 className={styles.header}>Регистрация</h2>
      <Input value={email} setValue={setEmail} type='text' placeholder='Введите адрес электронной почты...'/>
      <Input value={password} setValue={setPassword} type='password' placeholder='Введите пароль...'/>
      <button className={styles.btn} onClick={() => registration(email, password)}>Зарегистрироваться</button>
    </div>
  )
}

export default Registration