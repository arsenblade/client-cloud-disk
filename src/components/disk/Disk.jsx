import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDir, getFiles } from '../actions/file'
import cn from 'classnames'
import styles from './Disk.module.scss'
import FileList from './fileList/FileList'
import Popup from './popup/Popup'
import { setCurrentDir, setPopupDisplay } from '../../reducers/fileReducer'


const Disk = () => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)
  const dirStack = useSelector(state => state.files.dirStack)

  useEffect(() => {
    dispatch(getFiles(currentDir))
  }, [currentDir])

  function showPopupHandler() {
    dispatch(setPopupDisplay('flex'))
  }

  function backClickHandler() {
    const backDirId = dirStack.pop()
    dispatch(setCurrentDir(backDirId))
  }

  return (
    <div className={styles.disk}>
      <div className={styles.menu}>
        <button className={cn(styles.btn, styles.back)} onClick={() => backClickHandler()}>Назад</button>
        <button className={cn(styles.btn, styles.create)} onClick={() => showPopupHandler()}>Создать новую папку</button>
      </div>
      <FileList />
    </div>
  )
}

export default Disk