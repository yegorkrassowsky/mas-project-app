import {FetchUsersActionType, SetLoadingActionType} from '../types'
import {UsersActionTypes} from '../constants'
import {request} from '../store'

export const fetchUsers: FetchUsersActionType = () => {
  return (dispatch) => {
    dispatch(setUsersLoading(true))
    request.get('/users')
      .then(response => {
        if(response.data !== undefined) {
          dispatch({type: UsersActionTypes.SET, data: response.data})
        }
      })
      .catch(err => {})
      .then(() => dispatch(setUsersLoading(false)))
  }
}

const setUsersLoading: SetLoadingActionType = loading => ({type: UsersActionTypes.SET_LOADING, loading})