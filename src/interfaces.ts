import {FilterState, UsersState, TodosState, AuthState} from './types'

export interface IID {
  id: string
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

export interface IPassword {
  password: string
}

export interface IWebsite {
  website: string
}

export interface IStatus {
  status: number
}

export interface IDescription {
  description: string,
}

export interface IPriority {
  priority: string
}

export interface ITodo extends IID, IStatus, IDescription, IPriority {}
export interface ITodoForm extends IStatus, IDescription, IPriority {
  id?: string
}

export interface ITodos {
  todos: ITodo[]
}

export interface IName {
  name: string
}

export interface IPost {
  post: string
}

export interface IPhone {
  phone: string
}

export interface IMobile {
  mobile: string
}

export interface IUser extends IID, IName, IPost, IPhone, IMobile {}

export interface IPostAPI {
  ID: string
  NAME: string
}

export interface IUserAPI extends IID, IName, IPhone, IMobile {
  post: IPostAPI[]
}

export interface IUserSet extends IID, IName {}

export interface ILoggedIn {
  loggedIn: boolean
}

export interface IState {
  users: UsersState
  filter: FilterState
  todos: TodosState
  auth: AuthState
}

export interface ICredentials extends IUsername, IPassword {}