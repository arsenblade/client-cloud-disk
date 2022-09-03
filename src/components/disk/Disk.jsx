import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFiles, uploadFile } from '../actions/file'
import cn from 'classnames'
import styles from './Disk.module.scss'
import FileList from './fileList/FileList'
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

  function fileUploadHandler(event) {
    const files = [...event.target.files]
    files.forEach(file => dispatch(uploadFile(file, currentDir)))
  }

  return (
    <div className={styles.disk}>
      <div className={styles.menu}>
        <button className={cn(styles.btn, styles.back)} onClick={() => backClickHandler()} disabled={dirStack.length <= 0 && true}></button>
        <button className={cn(styles.btn, styles.create)} onClick={() => showPopupHandler()}>Создать новую папку</button>
        <label htmlFor='file' className={styles.uploadLabel}>Загрузить файл</label>
        <input multiple={true} onChange={(e) => fileUploadHandler(e)} type='file' id='file'  className={styles.uploadInput}/>
      </div>
      <FileList />
    </div>
  )
}

export default Disk