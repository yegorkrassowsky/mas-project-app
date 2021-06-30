import rootReducer from './reducers/root'
import {IState} from './interfaces'
import {ActionType} from './types'
import axios from 'axios'
import { createStore, applyMiddleware, Store } from 'redux'
import thunk, {ThunkAction} from 'redux-thunk'

declare module 'redux' {
  interface Dispatch<A extends Action = AnyAction> {
    <S, E, R>(asyncAction: ThunkAction<R, S, E, A>): R;
  }
}

export const request = axios.create({
  baseURL: '/api/v1',
  timeout: 10000,
  withCredentials: false,
})

const credentials = {
  username: process.env.REACT_APP_API_USERNAME,
  password: process.env.REACT_APP_API_PASSWORD,
}

const loginEndpoint = 'auth/'

export const login = async () => {
  const data = await request.post(loginEndpoint, credentials)
    .then(response => {
      if(response.data.success !== undefined) {
        return response.data.success.token
      }
      return false
    })

  return data;
}


export const getConfig = async () => {
  const token = await login()
  if(token) {
    return {
      headers: {
        'Authorization': `Token ${token}`,
      }
    }
  }
  return false
}
export const store: Store<IState, ActionType> = createStore(rootReducer, applyMiddleware(thunk))
