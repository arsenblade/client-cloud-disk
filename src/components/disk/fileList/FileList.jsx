import React from 'react'
import { useSelector } from 'react-redux'
import File from './file/File'
import styles from './FileList.module.scss'

const FileList = () => {
  const files = useSelector(state => state.files.files).map(file => <File key={file._id} file={file} />)
  return (
    <div className={styles.fieldList}>
      <div className={styles.header}>
        <h2 className={styles.name}>Название</h2>
        <h2 className={styles.date}>Дата</h2>
        <h2 className={styles.size}>Размер</h2>
      </div>
      {files}
    </div>
  )
}

export default FileList