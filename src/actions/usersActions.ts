import {FetchUsersActionType, SetLoadingActionType} from '../types'
import {UsersActionTypes} from '../constants'
import {request} from '../store'
import {IUserAPI, IPostAPI} from '../interfaces'
import {getConfig} from '../store'

const usersEndpoint = 'userlist/'

export const fetchUsers: FetchUsersActionType = () => {
  return async (dispatch) => {
    dispatch(setUsersLoading(true))
    const config = await getConfig()
    if(config) {
      request.get(usersEndpoint, config)
        .then(response => {
          if(response.data.success.data !== undefined) {
            const users = response.data.success.data.map((user: IUserAPI) => {
              const post = user.post.map((post: IPostAPI) => post.NAME).join(', ')
              return {...user, post}
            })
            dispatch({type: UsersActionTypes.SET, data: users})
          }
        })
        .catch(err => {})
        .then(() => dispatch(setUsersLoading(false)))
    } else {
      dispatch(setUsersLoading(false))
    }
  }
}

const setUsersLoading: SetLoadingActionType = loading => ({type: UsersActionTypes.SET_LOADING, loading})