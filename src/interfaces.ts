import {FilterState, TodosState} from './types'

export interface IID {
  id: number
}

export interface IActive {
  active: boolean
}

export interface ILoading {
  loading: boolean
}

export interface IUsername {
  username: string
}

export interface IWebsite {
  website: string
}

export interface ICompleted {
  completed: boolean
}

export interface ITodo extends IID, ICompleted {
  title: string,
}

export interface ITodos {
  todos: ITodo[]
}

export interface IName {
  name: string
}

export interface IUser extends IID, IName, IUsername, IWebsite {
  email: string
}

export interface IUserSet extends IID, IName {}

export interface IState {
  filter: FilterState
  todos: TodosState
}