import { hideLoader, showLoader } from "../../reducers/appReducer"
import { addFile, deleteFileAction, setFiles } from "../../reducers/fileReducer"
import { addUploadFile, changeUploadFile, showUploader } from "../../reducers/uploadReducer"
import { MyToast } from "../../ui/MyToast/MyToast"
import { API_URL, axiosPrivate } from "../api/interceptor"

export function getFiles(dirId, sortType) {
  return async dispatch => {
    try {
      dispatch(showLoader())
      let url = `files`
      if (dirId) {
        url = `files?parent=${dirId}`
      }
      if (sortType) {
        url = `files?sort=${sortType}`
      }
      if (dirId && sortType) {
        url = `files?parent=${dirId}&sort=${sortType}`
      }
      const response = await axiosPrivate.get(url, {
      })
      dispatch(setFiles(response.data))
    } catch (e) {
      MyToast(e.response.data.message, false)
    } finally {
      dispatch(hideLoader())
    }
  }
}

export function createDir(dirId, name) {
  return async dispatch => {
    try {
      const response = await axiosPrivate.post(`files`, {
        name,
        parent: dirId,
        type: 'dir'
      })
      dispatch(addFile(response.data))
      MyToast('Папка успешно создана', true)
    } catch (e) {
      MyToast(e.response.data.message, false)
    }
  }
}

export function uploadFile(file, dirId) {
  return async dispatch => {
      try {
          const formData = new FormData()
          formData.append('file', file)
          if (dirId) {
            formData.append('parent', dirId)
          }
          const uploadFile = {name: file.name, progress: 0, id: Date.now()}
          dispatch(showUploader())
          dispatch(addUploadFile(uploadFile))
          const response = await axiosPrivate.post(`files/upload`, formData, {
              onUploadProgress: progressEvent => {
                  const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                  if (totalLength) {
                    uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                    dispatch(changeUploadFile(uploadFile))
                  }
              }
          });
          dispatch(addFile(response.data))
      } catch (e) {
        MyToast(e?.response?.data?.message || 'Error uploading', false)
      }
  }
}

export async function downloadFile(file) {

  const response = await fetch(`${API_URL}files/download?id=${file._id}`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  if (response.status === 200) {
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      link.remove()
  }
}

export function deleteFile(file) {
  return async dispatch => {
      try {
        await axiosPrivate.delete(`files?id=${file._id}`)
        dispatch(deleteFileAction(file._id))
        MyToast('Папка успешно удалена', true)
      } catch (e) {
        MyToast(e?.response?.data?.message, false)
      }
  }
}

export function searchFiles(search) {
  return async dispatch => {
      try {
          const response = await axiosPrivate.get(`files/search?search=${search}`)
          dispatch(setFiles(response.data))
      } catch (e) {
          MyToast(e?.response?.data?.message || 'Search failed', false)
      } finally {
          dispatch(hideLoader())
      }
  }
}