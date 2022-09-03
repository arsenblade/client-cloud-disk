import React from 'react'
import styles from './File.module.scss'
import dirLogo from '../../../../assets/img/dir.png'
import fileLogo from '../../../../assets/img/file.png'
import { useDispatch, useSelector } from 'react-redux'
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer'

const File = ({file}) => {
  const sliceDate = file.date.slice(0, 10).split('-')
  const currentDir = useSelector(state => state.files.currentDir)
  const dispatch = useDispatch()
  const formatDate = `${sliceDate[2]}-${sliceDate[1]}-${sliceDate[0]}`

  function openDirHandler() {
    dispatch(pushToStack(currentDir))
    dispatch(setCurrentDir(file._id))
  }

  return (
    <div className={styles.file} onClick={file.type === 'dir' ? () => openDirHandler() : ''}>
      <img className={styles.img} width={50} height={50} src={file.type === 'dir' ? dirLogo : fileLogo} alt='' />
      <h2 className={styles.name}>{file.name}</h2>
      <div className={styles.date}>{formatDate}</div>
      <div className={styles.size}>{file.size}</div>
    </div>
  )
}

export default File