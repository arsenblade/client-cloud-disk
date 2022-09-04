import React from 'react'
import { useDispatch } from 'react-redux'
import { removeUploadFile } from '../../reducers/uploadReducer'
import styles from './Uploader.module.scss'

const UploadFile = ({file}) => {
  const dispatch = useDispatch()

  return (
    <div className={styles.file}>
      <div className={styles.fileHeader}>
        <h3 className={styles.fileName}>{file.name}</h3>
        <button className={styles.btnFile} onClick={() => dispatch(removeUploadFile(file.id))}>X</button>
      </div>
      <div className={styles.progressBar}>
        <div className={styles.uploadBar} style={{width: `${file.progress}%`}}/>
        <div className={styles.percentValue}>{file.progress}%</div>
      </div>
    </div>
  )
}

export default UploadFile