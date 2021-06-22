import {UsersActionTypes } from '../constants'
import {UsersState, UsersAction} from '../types'

const usersReducer = (state: UsersState = [], action: UsersAction ): UsersState => {
  switch(action.type) {
    case UsersActionTypes.SET:
      return action.data
    default:
      return state
  }
}

export default usersReducer