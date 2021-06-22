import {FetchTodosActionType, CloseTodosActionType, OpenTodosActionType} from '../types'
import {TodosActionTypes} from '../constants'
import {request} from '../store'

export const fetchTodos: FetchTodosActionType = (userId) => {
  return (dispatch) => {
    request.get(`/user/${userId}/todos`)
      .then(response => {
        if(response.data !== undefined) {
          dispatch({type: TodosActionTypes.SET, data: response.data})
        }
      })
      .catch(err => {})
      .then(() => {
        //Loader
      })    
    
  }
}

export const openTodosAction: OpenTodosActionType = (user) => {
  return (dispatch, getState) => {
    if(getState().todos.userId !== user.id) {
      dispatch({type: TodosActionTypes.SET_USER, user})
      dispatch(fetchTodos(user.id))
    }
    dispatch({type: TodosActionTypes.OPEN})
  }
}

export const closeTodosAction: CloseTodosActionType = () => ({type: TodosActionTypes.CLOSE})
