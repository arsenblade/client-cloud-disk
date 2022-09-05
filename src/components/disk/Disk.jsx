import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFiles, searchFiles, uploadFile } from '../actions/file'
import cn from 'classnames'
import styles from './Disk.module.scss'
import FileList from './fileList/FileList'
import { setCurrentDir, setPopupDisplay, setView } from '../../reducers/fileReducer'
import MySelect from '../../ui/Select/Select'
import { showLoader } from '../../reducers/appReducer'

const options = [
  {
    value: 'name',
    label: 'По имени'
  },
  {
    value: 'type',
    label: 'По типу'
  },
  {
    value: 'date',
    label: 'По дате'
  }]


const Disk = () => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)
  const loader = useSelector(state => state.app.loader)
  const dirStack = useSelector(state => state.files.dirStack)
  const [dragEnter, setDragEnter] = useState(false)
  const [sortType, setSortType] = useState({value: 'type', label: 'По типу'})
  const [searchName, setSearchName] = useState('')
  const [searchDebounce, setSearchDebounce] = useState(false)

  useEffect(() => {
    dispatch(getFiles(currentDir, sortType.value))
  }, [currentDir, sortType])

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

  function dragEnterHandler(event) {
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(true)
  }

  function dragLeaveHandler(event) {
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(false)
  }

  function dropHandler(event) {
    event.preventDefault()
    event.stopPropagation()
    let files = [...event.dataTransfer.files]
    files.forEach(file => dispatch(uploadFile(file, currentDir)))
    setDragEnter(false)
  }

  function searchChangeHandler(e) {
    setSearchName(e.target.value)
    if(searchDebounce != false) {
      clearTimeout(searchDebounce)
    }
    dispatch(showLoader())
    if(e.target.value !== '') {
      setSearchDebounce(setTimeout((value) => {
        dispatch(searchFiles(value))
      }, 500, e.target.value))
    } else {
      dispatch(getFiles(currentDir, sortType.value))
    }
  }

  return (
    !dragEnter 
      ? 
        <div className={styles.disk} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
          <div className={styles.menu}>
            <div className={styles.menuOne}>
              <button className={cn(styles.btn, styles.back)} onClick={() => backClickHandler()} disabled={dirStack.length <= 0 && true}></button>
              <button className={cn(styles.btn, styles.create)} onClick={() => showPopupHandler()}>Создать новую папку</button>
              <label htmlFor='file' className={styles.uploadLabel}>Загрузить файл</label>
              <input multiple={true} onChange={(e) => fileUploadHandler(e)} type='file' id='file'  className={styles.uploadInput}/>
            </div>
            <div className={styles.menuTwo}>
              <div className={styles.searchContainer}>
                <input className={styles.search} type='text' value={searchName} onChange={(e) => searchChangeHandler(e)}/>
              </div>
              <MySelect value={sortType} setSortType={setSortType} options={options}/>
              <button className={cn(styles.btnFormat,styles.plate)} onClick={() => dispatch(setView('plate'))}/>
              <button className={cn(styles.btnFormat, styles.list)} onClick={() => dispatch(setView('list'))}/>
            </div>
          </div>
        {loader 
        ?         
          <div className={styles.loader}>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          </div> 
        :
          <FileList />}
        </div>
      :
        <div className={cn(styles.disk, styles.dropContainer)} onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
          <div className={styles.dropArea}>
            Перетащите файлы
          </div>
        </div>
  )
}

export default Disk