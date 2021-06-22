import {combineReducers} from 'redux'
import usersReducer from './usersReducer'
import filterReducer from './filterReducer'
import todosReducer from './todosReducer'

const rootReducer = combineReducers({
  users: usersReducer,
  filter: filterReducer,
  todos: todosReducer,
})

export default rootReducer