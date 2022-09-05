import React from 'react'
import { useSelector } from 'react-redux'
import File from './file/File'
import styles from './FileList.module.scss'
import cn from 'classnames'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

const FileList = () => {
  const files = useSelector(state => state.files.files)
  const viewFile = useSelector(state => state.files.view)


  if(files.length === 0) {
    return (
      <div className={styles.noFiles}>
        Файлы не найдены
      </div>
    )
  }

  return (
    <div className={styles.filesList}>
      <div className={cn({
        [styles.hidden]: viewFile === 'plate',
        [styles.header]: viewFile === 'list'
      })}>
        <h2 className={styles.name}>Название</h2>
        <h2 className={styles.date}>Дата</h2>
        <h2 className={styles.size}>Размер</h2>
      </div>
      <TransitionGroup className={cn({
        [styles.filesContainerFormatList]: viewFile === 'list',
        [styles.filesContainerFormatPlate]: viewFile === 'plate'
      })}>
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