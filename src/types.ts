import {IUsername, IWebsite, IActive, IUserSet, IName} from './interfaces'

export type FilterParams = IUsername & IWebsite

export type FilterState = {
  params: FilterParams
} & IActive

export type TodosState = {
  userId: number
} & IName & IActive

export type GlobalState = {
  todos: TodosState
}

// Dispatched to props

export type SetFilterType = (params: FilterParams) => void
export type ResetFilterType = () => void
export type ToggleFilterType = () => void
export type OpenTodosType = (user: IUserSet) => void
export type CloseTodosType = () => void
