import {TodosAction, TodosState} from '../types'
import {TodosActionTypes} from '../constants'
import {ITodo} from '../interfaces'

const initialTodosState = {
  active: false,
  items: [],
  userId: null,
  name: '',
  loading: false,
}

const todosReducer = (state: TodosState = initialTodosState, action: TodosAction) => {
  switch(action.type) {
    case TodosActionTypes.SET:
      return {...state, items: action.data}
    case TodosActionTypes.SET_USER:
      return {...state, userId: action.user.id, name: action.user.name}
    case TodosActionTypes.OPEN:
      return {...state, active: true}
    case TodosActionTypes.CLOSE:
      return {...state, active: false}
    case TodosActionTypes.SET_LOADING:
      return {...state, loading: action.loading}
    case TodosActionTypes.ADD_TODO:
      return {...state, items: [action.data, ...state.items]}
    case TodosActionTypes.EDIT_TODO:
      return {...state, items: state.items.map((item: ITodo) => item.id === action.data.id ? action.data : item)}
    default:
      return state
  }
}

export default todosReducer