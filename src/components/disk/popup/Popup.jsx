import React, { useState } from 'react'
import Input from '../../../ui/Input/Input'
import styles from './Popup.module.scss'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { setPopupDisplay } from '../../../reducers/fileReducer'
import { createDir } from '../../actions/file'

const Popup = () => {
  const [dirName, setDirName] = useState('')
  const popupDisplay = useSelector(state => state.files.popupDisplay)
  const currentDir = useSelector(state => state.files.currentDir)
  const dispatch = useDispatch()

  const closePopup = () => {
    dispatch(setPopupDisplay('none'))
    setDirName('')
  }

  function createHandler() {
    dispatch(createDir(currentDir, dirName))
    closePopup()
  }

  return (
    <div className={styles.containerPopup} onClick={() => closePopup()} 
      style={{display: popupDisplay}}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Создать новую папку</h2>
          <button className={cn(styles.btn, styles.closeButton)} onClick={() => closePopup()}>X</button>
        </div>
        <Input type="text" placeholder="Введите название папки..." value={dirName} setValue={setDirName}/>
        <button className={cn(styles.btn, styles.createButton)} onClick={() => createHandler()}>Создать</button>
      </div>
    </div>
  )
}

export default Popup