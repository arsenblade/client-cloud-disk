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