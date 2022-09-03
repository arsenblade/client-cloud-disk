import { addFile, setFiles } from "../../reducers/fileReducer"
import { axiosPrivate } from "../api/api"

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