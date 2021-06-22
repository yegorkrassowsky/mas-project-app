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
  baseURL: 'https://jsonplaceholder.typicode.com',
  withCredentials: true,
})

export const store: Store<IState, ActionType> = createStore(rootReducer, applyMiddleware(thunk))
