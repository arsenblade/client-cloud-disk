import React from 'react'
import { useSelector } from 'react-redux'
import File from './file/File'
import styles from './FileList.module.scss'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

const FileList = () => {
  const files = useSelector(state => state.files.files)
  return (
    <div className={styles.fieldList}>
      <div className={styles.header}>
        <h2 className={styles.name}>Название</h2>
        <h2 className={styles.date}>Дата</h2>
        <h2 className={styles.size}>Размер</h2>
      </div>
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
  )
}

export default FileList