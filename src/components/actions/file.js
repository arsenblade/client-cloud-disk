import { addFile, deleteFileAction, setFiles } from "../../reducers/fileReducer"
import { API_URL, axiosPrivate } from "../api/interceptor"

export function getFiles(dirId) {
  return async dispatch => {
    try {
      console.log(dirId)
      const response = await axiosPrivate.get(`${dirId ? 'files?parent='+ dirId : 'files'}`, {
      })
      dispatch(setFiles(response.data))
    } catch (e) {
      alert(e.response.data.message)
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
    } catch (e) {
      alert(e.response.data.message)
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

          const response = await axiosPrivate.post(`files/upload`, formData, {
              onUploadProgress: progressEvent => {
                  const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                  console.log('total', totalLength)
                  if (totalLength) {
                      let progress = Math.round((progressEvent.loaded * 100) / totalLength)
                      console.log(progress)
                  }
              }
          });
          dispatch(addFile(response.data))
      } catch (e) {
          alert(e?.response?.data?.message)
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
        alert('Delete file successfully')
      } catch (e) {
          alert(e?.response?.data?.message)
      }
  }
}