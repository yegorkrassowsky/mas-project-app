import {FetchTodosActionType, CloseTodosActionType, OpenTodosActionType, SetLoadingActionType, SaveTodoActionType} from '../types'
import {TodosActionTypes} from '../constants'
import {request, getConfig} from '../store'

const setTodosLoading: SetLoadingActionType = loading => ({type: TodosActionTypes.SET_LOADING, loading})

export const fetchTodos: FetchTodosActionType = (userId) => {
  return async (dispatch) => {
    dispatch(setTodosLoading(true))
    const config = await getConfig()
    if(config){
      request.get(`tasks/`, {
        ...config,
        params: {
          parentId: '1',
          typeBranch: 'p',
          filter: ['responsible'],
          responsible: userId,
        }
      })
        .then(response => {
          if(response.data.success.data !== undefined) {
            dispatch({
              type: TodosActionTypes.SET,
              data: response.data.success.data.map((todo: any) => ({
                id: todo.id,
                description: todo.description,
                status: todo.status,
                priority: todo.priority,
              }))
            })
          }
        })
        .catch(err => {})
        .then(() => dispatch(setTodosLoading(false)))
    } else {
      dispatch(setTodosLoading(false))
    }
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

export const saveTodoAction: SaveTodoActionType = (todo) => {
  return async (dispatch, getState) => {
    dispatch(setTodosLoading(true))
    const userId = getState().todos.userId
    const config = await getConfig()
    if(config){
      const dateStart = new Date()
      const dateFinish = new Date(dateStart.setFullYear(dateStart.getFullYear() + 1))
      const params = {
        ...todo,
        status: todo.status === 5 ? 'completed' : 'new',
        responsible_id: userId,
        date_plan_start: dateStart.toISOString(),
        date_plan_finish: dateFinish.toISOString(),
        head_id: 1,
        head_post_id: 1,
        parent_id_project: 1,
        taskItem: 'description,status,priority',
      }
      if(todo.id === undefined) {
        request.post(`tasks/`, params, config)
          .then(response => {
            if(response.data.success !== undefined){
              dispatch({type: TodosActionTypes.ADD_TODO, data: {...todo, id: response.data.success.data.id}})
            }
          })
          .then(() => dispatch(setTodosLoading(false)))
      } else {
        request.put(`tasks/${todo.id}`, params, config)
          .then(response => {
            if(response.data.success !== undefined){
              dispatch({type: TodosActionTypes.EDIT_TODO, data: {...todo, id: response.data.success.data.id}})
            }
          })
          .then(() => dispatch(setTodosLoading(false)))
      }
    } else {
      dispatch(setTodosLoading(false))
    }

  }
}

export const closeTodosAction: CloseTodosActionType = () => ({type: TodosActionTypes.CLOSE})
