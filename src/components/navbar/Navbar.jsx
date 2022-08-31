import React from 'react'
import styles from './Navbar.module.scss'
import Logo from '../../assets/img/logo-cloud.png'
import cn from 'classnames'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <img src={Logo} alt='' className={styles.logo} />
      <h1 className={styles.header}>MERN CLOUD</h1>
      <button className={cn(styles.btn, styles.login)}>Войти</button>
      <button className={cn(styles.btn, styles.registration)}>Регистрация</button>
    </nav>
  )
}

export default Navbar