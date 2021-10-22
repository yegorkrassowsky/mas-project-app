import {TodosAction, TodosState} from '../types'
import {TodosActionTypes} from '../constants'

const initialTodosState = {
  active: false,
  userId: -1,
  name: '',
}

const todosReducer = (state: TodosState = initialTodosState, action: TodosAction) => {
  switch(action.type) {
    case TodosActionTypes.SET_USER:
      return {...state, userId: action.user.id, name: action.user.name}
    case TodosActionTypes.OPEN:
      return {...state, active: true}
    case TodosActionTypes.CLOSE:
      return {...state, active: false}
    default:
      return state
  }
}

export default todosReducer