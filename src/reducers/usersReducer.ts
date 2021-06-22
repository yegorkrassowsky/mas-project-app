import {UsersActionTypes } from '../constants'
import {UsersState, UsersAction} from '../types'

const initiaUsersState = {
  items: [],
  loading: false,
}

const usersReducer = (state: UsersState = initiaUsersState, action: UsersAction ): UsersState => {
  switch(action.type) {
    case UsersActionTypes.SET:
      return {...state, items: action.data}
    case UsersActionTypes.SET_LOADING:
      return {...state, loading: action.loading}
    default:
      return state
  }
}

export default usersReducer