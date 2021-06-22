import {FetchUsersActionType} from '../types'
import {UsersActionTypes} from '../constants'
import {request} from '../store'

export const fetchUsers: FetchUsersActionType = () => {
  return (dispatch) => {
    //Loader
    request.get('/users')
      .then(response => {
        if(response.data !== undefined) {
          dispatch({type: UsersActionTypes.SET, data: response.data})
        }
      })
      .catch(err => {})
      .then(() => {
        //Loader
      })    
  }
}