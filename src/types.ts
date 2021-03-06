import {IUser, IState, IUsername, IWebsite, IActive, ITodo, IUserSet, ILoading, IName} from './interfaces'
import {UsersActionTypes, FilterActionTypes, TodosActionTypes} from './constants'
import {ThunkDispatch} from 'redux-thunk'

export type UsersState = {
  items: IUser[]
} & ILoading

export type FilterParams = IUsername & IWebsite

export type FilterState = {
  params: FilterParams
} & IActive

export type TodosState = {
  items: ITodo[]
  userId: number | null
} & IName & IActive & ILoading

export type FilterUsersType = (users: IUser[], params: FilterParams) => IUser[]

// Action Types

export type UsersAction =
| {type: UsersActionTypes.SET, data: IUser[]}
| {type: UsersActionTypes.SET_LOADING, loading: boolean}

export type FilterAction =
| {type: FilterActionTypes.RESET}
| {type: FilterActionTypes.TOGGLE}
| {type: FilterActionTypes.SET, data: FilterParams}

export type TodosAction =
| {type: TodosActionTypes.SET, data: ITodo[]}
| {type: TodosActionTypes.SET_USER, user: IUserSet}
| {type: TodosActionTypes.OPEN}
| {type: TodosActionTypes.CLOSE}
| {type: TodosActionTypes.SET_LOADING, loading: boolean}

export type ActionType = UsersAction | FilterAction | TodosAction

// Dispatched to props

export type SetFilterType = (params: FilterParams) => void
export type ResetFilterType = () => void
export type ToggleFilterType = () => void
export type OpenTodosType = (user: IUserSet) => void
export type CloseTodosType = () => void

// Thunks

export type ThunkDispatchType = ThunkDispatch<IState, void, ActionType>
export type GetStateType = () => IState
export type DispatchCallbackType = (dispatch: ThunkDispatchType, getState: GetStateType) => void
export type FetchTodosActionType = (userId: number) => DispatchCallbackType
export type FetchUsersActionType = () => DispatchCallbackType
export type OpenTodosActionType = (user: IUserSet) => DispatchCallbackType

// Actions

export type SetLoadingActionType = (loading: boolean) => ActionType
export type SetFilterActionType = (params: FilterParams) => FilterAction
export type CloseTodosActionType = () => TodosAction
export type SetUsersLoadingActionType = (loading: boolean) => UsersAction