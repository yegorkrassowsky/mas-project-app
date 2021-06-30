import { AuthActionTypes } from '../constants'
import {AuthState, AuthAction} from '../types'


const initialAuthState = {
  loggedIn: true
}

const authReducer = (state: AuthState = initialAuthState, action: AuthAction): AuthState => {
  switch(action.type) {
    case AuthActionTypes.LOGIN:
      return {...state, loggedIn: true}
    default:
      return state
  }
}

export default authReducer