import React from 'react'
import styles from './Navbar.module.scss'
import Logo from '../../assets/img/logo-cloud.png'
import {Link} from 'react-router-dom'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../reducers/userReducer'

const Navbar = () => {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  return (
    <nav className={styles.navbar}>
      <img src={Logo} alt='' className={styles.logo} />
      <h1 className={styles.header}>MERN CLOUD</h1>
      
      {!isAuth && <Link to='/login' className={styles.login}>
        <button className={styles.btn}>Войти</button>
      </Link>}
      {!isAuth && <Link to='/registration'>
        <button className={styles.btn}>Регистрация</button>
      </Link>}

      {isAuth && <button className={cn(styles.btn, styles.logout)} onClick={() => dispatch(logout())}>Выход</button>}
    </nav>
  )
}

export default Navbar