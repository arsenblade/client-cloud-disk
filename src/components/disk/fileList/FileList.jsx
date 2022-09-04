import React from 'react'
import { useSelector } from 'react-redux'
import File from './file/File'
import styles from './FileList.module.scss'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

const FileList = () => {
  const files = useSelector(state => state.files.files)

  if(files.length === 0) {
    return (
      <div className={styles.noFiles}>
        Файлы не найдены
      </div>
    )
  }

  return (
    <div className={styles.filesList}>
      <div className={styles.header}>
        <h2 className={styles.name}>Название</h2>
        <h2 className={styles.date}>Дата</h2>
        <h2 className={styles.size}>Размер</h2>
      </div>
      <div className={styles.filesContainer}>
        <TransitionGroup>
          {files.map(file => 
            <CSSTransition 
              key={file._id}
              timeout={500}
              classNames={'file'}
              exit={false}
              >
              <File file={file} />
            </CSSTransition>)}
        </TransitionGroup>
      </div>
    </div>
  )
}

export default FileList