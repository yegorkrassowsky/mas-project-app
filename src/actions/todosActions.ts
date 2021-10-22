import {CloseTodosActionType, OpenTodosActionType} from '../types'
import {TodosActionTypes} from '../constants'


export const openTodosAction: OpenTodosActionType = (user) => {
  return (dispatch, getState) => {
    if(getState().todos.userId !== user.id) {
      dispatch({type: TodosActionTypes.SET_USER, user})
    }
    dispatch({type: TodosActionTypes.OPEN})
  }
}

export const closeTodosAction: CloseTodosActionType = () => ({type: TodosActionTypes.CLOSE})
