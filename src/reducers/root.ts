import {combineReducers} from 'redux'
import usersReducer from './usersReducer'
import filterReducer from './filterReducer'
import todosReducer from './todosReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers({
  users: usersReducer,
  filter: filterReducer,
  todos: todosReducer,
  auth: authReducer,
})

export default rootReducer