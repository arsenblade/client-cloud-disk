import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideUploader } from '../../reducers/uploadReducer'
import styles from './Uploader.module.scss'
import UploadFile from './UploadFile'

const Uploader = () => {
  const files = useSelector(state => state.upload.files)
  const isVisible = useSelector(state => state.upload.isVisible)
  const dispatch = useDispatch()
  return (
    isVisible &&
    <div className={styles.uploader}> 
      <div className={styles.header}>
        <h2 className={styles.title}>Загрузки</h2>
        <button className={styles.btn} onClick={() => dispatch(hideUploader())}>X</button>
      </div>
      <div className={styles.fileContainer}>
        {files.map(file => <UploadFile key={file.id} file={file} />)}
      </div>
    </div>
  )
}

export default Uploader